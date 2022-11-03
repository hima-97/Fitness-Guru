// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Tracked Exercise" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
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

// Defining and compiling model:
module.exports = mongoose.model("TrackedExercises", TrackedExercisesSchema);