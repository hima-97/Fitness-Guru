// The Exercise.js file within your project's models directory plays a crucial role in defining the Mongoose schema for the Exercise model in your MongoDB database. This schema outlines the structure of exercise documents and establishes the fields and their types, enabling effective data management for exercise entities. Below is a comprehensive explanation of the schema setup and its components:

// **Schema Definition**
// Using Mongoose's Schema constructor, the ExerciseSchema is meticulously defined to represent various properties of an exercise, each configured with specific attributes like type, requirement status, and references to other models:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ExerciseSchema = new Schema({
//     googleId: {
//         type: String,
//         required: false,
//         description: "Optionally stores the Google ID of the user associated with the exercise, allowing for user-specific exercise data storage."
//     },
//     workout: {
//         type: Schema.Types.ObjectId,
//         ref: 'Workout',
//         required: false,
//         description: "Links to a Workout document to establish a relationship between the exercise and its workout session."
//     },
//     name: {
//         type: String,
//         required: true,
//         description: "The name of the exercise, crucial for identification and reference."
//     },
//     sets: {
//         type: Number,
//         required: false,
//         description: "The number of sets performed for the exercise."
//     },
//     repetitions: {
//         type: Number,
//         required: false,
//         description: "Indicates the number of repetitions of the exercise per set."
//     },
//     weight: {
//         type: Number,
//         required: false,
//         description: "Records the weight used for the exercise, if applicable."
//     },
//     notes: {
//         type: String,
//         required: false,
//         description: "Optional field for users to add any notes or comments about the exercise."
//     },
//     description: {
//         type: String,
//         required: false,
//         description: "Provides a detailed description of the exercise, including execution techniques or the purpose of the exercise."
//     }
// });
// ```

// **Model Compilation**
// Once the schema is defined, it is compiled into a Mongoose model named 'Exercise'. This model is instrumental in performing CRUD operations on documents within the exercises collection of the database.

// ```javascript
// const Exercise = mongoose.model('Exercise', ExerciseSchema);
// ```

// **Use in Application**
// By exporting the Exercise model, it becomes accessible throughout your application, allowing other parts of your application to require and interact with the exercise data efficiently.

// ```javascript
// module.exports = Exercise;
// ```

// **Application Impact**
// The configuration of the Exercise model with its detailed schema ensures that all interactions with exercise data are structured and consistent with your application’s data rules and requirements. It supports the creation, reading, updating, and deletion of exercise records, underpinning the functionality of your fitness application's features related to exercise management.

// This schema not only provides clarity and consistency in how exercise data is stored and retrieved but also supports relational aspects by linking exercises to specific workouts, enhancing the relational capabilities within a typically non-relational MongoDB environment.


const mongoose = require("mongoose");

// Define the Exercise schema, which represents the structure of the data entries in MongoDB for exercises.
const ExerciseSchema = new mongoose.Schema({
    // 'googleId' identifies the Google user associated with the exercise. It's not required, allowing for exercises not tied to a specific user.
    googleId: {
        type: String,
        required: false,
    },
    // 'workout' creates a relationship between this exercise and a Workout document. It references the 'Workout' model using MongoDB's ObjectId.
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: false,
    },
    // 'name' is a required field that stores the name of the exercise. This is crucial for identifying the exercise in operations and queries.
    name: {
        type: String,
        required: true,
    },
    // 'sets' captures the number of sets to be performed. This is optional as not all exercise records might specify the number of sets.
    sets: {
        type: Number,
        required: false,
    },
    // 'repetitions' denotes how many times an exercise is repeated in each set. This field is optional.
    repetitions: {
        type: Number,
        required: false,
    },
    // 'weight' records the weight used during the exercise. Optional because not all exercises involve weights.
    weight: {
        type: Number,
        required: false,
    },
    // 'notes' is a flexible field for users to add any additional comments or information about the exercise.
    notes: {
        type: String,
        require: false,
    },
    // 'description' provides a space to include a detailed description of the exercise. This might include how it's performed or its benefits.
    description: {
        type: String,
        require: false,
    }
});

// Export the Exercise model. This model is based on the ExerciseSchema and is used to interact with the 'exercises' collection in MongoDB.
// The model allows for creating, querying, updating, and deleting exercise records in a structured way.
module.exports = mongoose.model("Exercise", ExerciseSchema);
