// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Exercise" entity database schema, using mongoose

const mongoose = require("mongoose");

// Defining schema:
const ExerciseSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: false,
    },
    repetitions: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    notes: {
        type: String,
        require: false,
    },
    description: {
        type: String,
        require: false,
    }
});

// Defining and compiling model:
module.exports = mongoose.model("Exercise", ExerciseSchema);
