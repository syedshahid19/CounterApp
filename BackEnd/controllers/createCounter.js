const Counter = require("../models/Counter");

exports.createCounter = async(req, res)=>{
    try {
        const { name, value } = req.body;
        const counter = new Counter({ name, value });
        await counter.save();
        res.json(counter);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}

