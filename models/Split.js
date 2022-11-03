// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Split" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
const SplitSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    workouts: {
        type: Array,
        required: false,
    },
    notes: {
        type: String,
        require: false,
    },
    public: {
        type: String,
        require: false,
        default: "false",
    },
});

// Defining and compiling model:
module.exports = mongoose.model("Split", SplitSchema);
