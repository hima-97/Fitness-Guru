// Models are defined through the Schema interface
// A model represents a collection of documents in the database that you can search
// However, a model's instances represent individual documents that you can save and retrieve
// "User" entity database schema, using mongoose:

const mongoose = require("mongoose");

// Defining schema:
// The schema has several fields, each defined with a JSON object, describing the properties of the "User" entity.
// Each field has a type, which can be a string, number, and a "required" property to specify if the field is required or not.
// Finally, the code exports the model with the mongoose.model("User", UserSchema) function, which creates a Mongoose model based on the "UserSchema" and allows it to be imported and used in other parts of the application.
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: false,
    },
    heightFeet: {
        type: Number,
        required: false,
    },
    heightInches: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profilePic: {
        type: String,
        default: 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
    },
});

// Defining and compiling model:
module.exports = mongoose.model("User", UserSchema);
