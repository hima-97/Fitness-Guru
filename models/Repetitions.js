const mongoose = require("mongoose");

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

module.exports = mongoose.model("Repetitions", RepetitionsSchema);