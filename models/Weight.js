// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Weight" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
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

// Defining and compiling model:
module.exports = mongoose.model("Weight", WeightSchema);