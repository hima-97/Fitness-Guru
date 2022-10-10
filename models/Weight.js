const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
    repetitions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repetitions",
        required: false,
    },
    weight: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Weight", WeightSchema);