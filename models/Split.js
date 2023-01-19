// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "Split" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "Split" entity.
// Each field has a type, which can be a string, number, and a "required" property to specify if the field is required or not.
// Finally, the code exports the model with the mongoose.model("Split", SplitSchema) function, which creates a Mongoose model based on the "SplitSchema" and allows it to be imported and used in other parts of the application.
const SplitSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    workouts: {
        type: Array,
        required: false,
    },
    notes: {
        type: String,
        require: false,
    },
    public: {
        type: String,
        require: false,
        default: "false",
    },
});

// Defining and compiling model:
module.exports = mongoose.model("Split", SplitSchema);
