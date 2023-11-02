const Counter = require("../models/Counter");

exports.decrementCounter = async(req, res)=>{
    try {
        const counter = await Counter.findById(req.params.id);
        if (counter) {
          counter.value--;
          await counter.save();
          res.json(counter);
        } else {
          res.status(404).json({ error: "Counter not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}
