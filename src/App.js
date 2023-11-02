import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./App.css"

const socket = io("http://localhost:3000");

function App() {
  const [counters, setCounters] = useState([]);
  const [newCounterName, setNewCounterName] = useState("");

  useEffect(() => {
    socket.on("counterAdded", () => {
      fetchCounters();
    });

    socket.on("counterUpdated", () => {
      fetchCounters();
    });

    socket.on("counterRemoved", () => {
      fetchCounters();
    });

    fetchCounters();
  }, [counters]);

  const fetchCounters = async () => {
    const response = await axios.get("https://counterapp-backend.onrender.com/api/v1/getAllCounters");
    setCounters(response.data);
  };

  const handleIncrement = async (id) => {
    console.log(id)
    await axios.put(`https://counterapp-backend.onrender.com/api/v1/counterIncrement/${id}`);
    socket.emit("increment", id);
  };

  const handleDecrement = async (id) => {
    await axios.put(`https://counterapp-backend.onrender.com/api/v1/counterDecrement/${id}`);
    socket.emit("decrement", id);
  };

  const handleRemove = async (id) => {
    await axios.delete(`https://counterapp-backend.onrender.com/api/v1/deleteCounter/${id}`);
    socket.emit("remove", id);
  };

  const handleAddCounter = async () => {
    if (newCounterName) {
      await axios.post("https://counterapp-backend.onrender.com/api/v1/Createcounters", {
        name: newCounterName,
        value: 0,
      });
      setNewCounterName("");
      socket.emit("addCounter");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow p-8 sm:rounded-xl">
          <h1 className="text-2xl font-semibold mb-4">Counter App</h1>

          <div className="space-y-4">
            {counters.map((counter) => (
              <div key={counter._id} className="border border-gray-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold">{counter.name}</h2>
                <p>Value: {counter.value}</p>
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleIncrement(counter._id)}
                  >
                    Increment
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDecrement(counter._id)}
                  >
                    Decrement
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={() => handleRemove(counter._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="New Counter Name"
              value={newCounterName}
              onChange={(e) => setNewCounterName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddCounter}
            >
              Add Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
