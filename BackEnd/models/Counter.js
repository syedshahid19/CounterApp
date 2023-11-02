const mongoose = require("mongoose");

// Define the Tags schema
const counterSchema = new mongoose.Schema({
	name: {
		type: String,
	},
    value : {
        type: Number
    }
});

// Export the Tags model
module.exports = mongoose.model("Counter", counterSchema);
