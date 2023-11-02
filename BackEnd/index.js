const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Counter = require("./models/Counter");


require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());

// // Socket.io handling for real-time updates
// io.on("connection", (socket) => {
//     socket.on("increment", async (counterId) => {
//       const counter = await Counter.findById(counterId);
//       if (counter) {
//         counter.value++;
//         await counter.save();
//         io.emit("counterUpdated");
//       }
//     });
  
//     socket.on("decrement", async (counterId) => {
//       const counter = await Counter.findById(counterId);
//       if (counter) {
//         counter.value--;
//         await counter.save();
//         io.emit("counterUpdated");
//       }
//     });
  
//     socket.on("remove", async (counterId) => {
//       await Counter.findByIdAndRemove(counterId);
//       io.emit("counterRemoved");
//     });
//   });
  


const counterRoutes = require("./routes/counterRoutes");
app.use("/api/v1", counterRoutes);


app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`);
})


const {dbConnect} = require("./config/database");
dbConnect();


app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE</h1>`);
})