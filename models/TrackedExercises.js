const mongoose = require("mongoose");

const TrackedExercisesSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("TrackedExercises", TrackedExercisesSchema);