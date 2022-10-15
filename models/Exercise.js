// "Exercise" entity database schema, using mongoose:

const mongoose = require("mongoose");

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

module.exports = mongoose.model("Exercise", ExerciseSchema);
