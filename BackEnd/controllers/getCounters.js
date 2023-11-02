const Counter = require("../models/Counter");

exports.getCounters = async(req, res)=>{
    try {
        const counters = await Counter.find();
        res.json(counters);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}
