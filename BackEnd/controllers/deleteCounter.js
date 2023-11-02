const Counter = require("../models/Counter");

exports.deleteCounter = async(req, res)=>{
    try {
        const {id} = req.params;
        console.log("id:", id);
        const del = await Counter.findByIdAndDelete(id);
        res.json({ message: "Counter removed" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}
