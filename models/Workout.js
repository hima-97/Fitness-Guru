// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Workout" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
const WorkoutSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    split: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Split",
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    exercises: {
        type: Array,
        required: true,
    },
});

// Defining and compiling model:
module.exports = mongoose.model("Workout", WorkoutSchema);
