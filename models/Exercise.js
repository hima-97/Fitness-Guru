// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Exercise" entity database schema, using mongoose

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "Exercise" entity.
// Each field has a type, which can be a string, number, or in the case of "workout", an ObjectId, and a "required" property to specify if the field is required or not.
// The "workout" field has an additional property "ref" which references the "Workout" model.
// Finally, the code exports the model with the mongoose.model("Exercise", ExerciseSchema) function, which creates a Mongoose model based on the "ExerciseSchema" and allows it to be imported and used in other parts of the application.
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
