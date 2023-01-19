// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Repetitions" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "Repetitions" entity.
// Each field has a type, which can be a string, number, or in the case of "weights", an ObjectId, and a "required" property to specify if the field is required or not.
// The "weights" field has an additional property "ref" which references the "TrackedExercises" model.
// Finally, the code exports the model with the mongoose.model("Repetitions", RepetitionsSchema) function, which creates a Mongoose model based on the "RepetitionsSchema" and allows it to be imported and used in other parts of the application.
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