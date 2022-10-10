const mongoose = require("mongoose");

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

module.exports = mongoose.model("Workout", WorkoutSchema);
