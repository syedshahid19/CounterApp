const express = require("express");
const router = express.Router();


const {getCounters} = require("../controllers/getCounters");
const {createCounter} = require("../controllers/createCounter");
const {incrementCounter} = require("../controllers/incrementCounter");
const {decrementCounter} = require("../controllers/decrementCounter");
const {deleteCounter} = require("../controllers/deleteCounter");


router.get("/getAllCounters", getCounters);
router.post("/Createcounters", createCounter);
router.put("/counterIncrement/:id", incrementCounter);
router.put("/counterDecrement/:id",decrementCounter);
router.delete("/deleteCounter/:id",deleteCounter);


module.exports = router;