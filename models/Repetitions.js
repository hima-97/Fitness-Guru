// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Repetitions" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
const RepetitionsSchema = new mongoose.Schema({
    weights: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrackedExercises",
        required: false,
    },
    repetitions: {
        type: Number,
        required: true,
    }
});

// Defining and compiling model:
module.exports = mongoose.model("Repetitions", RepetitionsSchema);