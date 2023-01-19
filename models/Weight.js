// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Weight" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "Weight" entity.
// Each field has a type, which can be a string, number, and a "required" property to specify if the field is required or not.
// The "repetitions" field has an additional property "ref" which references the "Repetitions" model.
// Finally, the code exports the model with the mongoose.model("Weight", WeightSchema) function, which creates a Mongoose model based on the "WeightSchema" and allows it to be imported and used in other parts of the application.
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