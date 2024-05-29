// The TrackedExercises.js file in your models directory is essential for managing the data related to exercises that users choose to track over time. By using Mongoose to define a schema, this model helps users monitor their progress effectively within your fitness application. Below is a detailed breakdown of the schema definition and its role within your application:

// **Schema Definition**
// The TrackedExercisesSchema is defined using Mongoose's Schema constructor. It includes several fields that detail the properties of a "TrackedExercises" entity, ensuring comprehensive data management for tracked exercises:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TrackedExercisesSchema = new Schema({
//     googleId: {
//         type: String,
//         required: false,
//         description: "Stores the Google ID of the user tracking the exercise. Ensures user-specific data management and access control."
//     },
//     name: {
//         type: String,
//         required: true,
//         description: "Name of the tracked exercise, essential for identification and display within the application."
//     }
// });
// ```

// **Model Compilation**
// The defined schema is compiled into a Mongoose model named 'TrackedExercises'. This model enables CRUD operations on the trackedexercises collection within the MongoDB database, facilitating efficient data management:

// ```javascript
// const TrackedExercises = mongoose.model('TrackedExercises', TrackedExercisesSchema);
// ```

// **Use in Application**
// By exporting the TrackedExercises model, it becomes accessible throughout your application, enabling various modules to interact with the tracked exercise data:

// ```javascript
// module.exports = TrackedExercises;
// ```

// **Application Impact**
// - **User-Specific Tracking:** The inclusion of the googleId field ensures that each user's tracked exercises are stored and managed separately, enhancing data security and personalization.
// - **Exercise Identification:** The required name field allows users to easily identify and differentiate between various exercises they are tracking, which is critical for monitoring progress over time.
// - **Data Management:** The TrackedExercises model supports robust data operations, enabling users to add, update, retrieve, and delete tracked exercise entries, thereby maintaining a detailed log of their workout routines and improvements.


const mongoose = require("mongoose");

// Define the schema for tracked exercises
// This schema outlines the structure of the "TrackedExercises" collection in the MongoDB database.
const TrackedExercisesSchema = new mongoose.Schema({
    // googleId: The Google ID of the user tracking this exercise
    // Type: String
    // Required: false, meaning this field is optional
    googleId: {
        type: String,
        required: false,
    },
    // name: The name of the exercise being tracked
    // Type: String
    // Required: true, meaning this field must be provided
    name: {
        type: String,
        required: true,
    }
});

// Compile the schema into a model
// The mongoose.model function creates a model from the schema, allowing for interaction with the "TrackedExercises" collection in the database.
module.exports = mongoose.model("TrackedExercises", TrackedExercisesSchema);
