// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Workout" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "Workout" entity.
// Each field has a type, which can be a string, number, and a "required" property to specify if the field is required or not.
// The "split" field has an additional property "ref" which references the "Split" model.
// Finally, the code exports the model with the mongoose.model("Workout", WorkoutSchema) function, which creates a Mongoose model based on the "WorkoutSchema" and allows it to be imported and used in other parts of the application.
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
