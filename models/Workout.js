// The Workout.js file in your models directory is essential for managing workout data within your MongoDB database using Mongoose. This model defines the structure for storing and handling workout-related information, including the exercises that comprise each workout. Below is a detailed explanation of the schema definition and its role within your application:

// **Schema Definition**
// The WorkoutSchema is defined using Mongoose's Schema constructor. It includes several fields to capture comprehensive workout data:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const WorkoutSchema = new Schema({
//     googleId: {
//         type: String,
//         required: false,
//         description: "Stores the Google ID of the user who created the workout. This helps associate workouts with specific users."
//     },
//     split: {
//         type: Schema.Types.ObjectId,
//         ref: 'Split',
//         required: false,
//         description: "Stores the ID of the split associated with this workout. It references the Split model, establishing a relationship between workouts and splits."
//     },
//     name: {
//         type: String,
//         required: true,
//         description: "Stores the name of the workout, ensuring that each workout has a descriptive name."
//     },
//     exercises: {
//         type: Array,
//         required: true,
//         description: "Stores an array of exercises included in the workout, ensuring that each workout has at least one exercise associated with it."
//     }
// });
// ```

// **Model Compilation**
// The defined schema is compiled into a Mongoose model named 'Workout'. This model enables CRUD operations on the workouts collection within the MongoDB database:

// ```javascript
// const Workout = mongoose.model('Workout', WorkoutSchema);
// ```

// **Use in Application**
// By exporting the Workout model, it becomes accessible throughout your application, allowing various modules to interact with the workout data:

// ```javascript
// module.exports = Workout;
// ```

// **Application Impact**
// - **User Association:** The googleId field links each workout to a specific user, enabling personalized workout management and retrieval.
// - **Relational Data Management:** The split field, referencing the Split model, ensures that workouts can be associated with specific splits, maintaining relational integrity within the database.
// - **Comprehensive Workout Data:** The name and exercises fields ensure that each workout has a descriptive name and a set of exercises, facilitating detailed workout planning and execution.
// - **Data Management:** The Workout model supports robust CRUD operations, allowing users to add, update, retrieve, and delete workouts, which is essential for managing personalized workout routines.



const mongoose = require("mongoose");

// Defining the Workout schema:
// The schema defines the structure of the Workout documents within the MongoDB collection.
// Each field in the schema represents a property of the Workout entity, with specified data types and validation rules.
const WorkoutSchema = new mongoose.Schema({
    
    // googleId field:
    // This field stores the Google ID of the user who created the workout.
    // It helps to associate workouts with specific users.
    // Type: String
    // Required: No
    googleId: {
        type: String,
        required: false,
    },
    
    // split field:
    // This field stores the ID of the split associated with this workout.
    // It references the 'Split' model, establishing a relationship between workouts and splits.
    // Type: mongoose.Schema.Types.ObjectId (references an ObjectId from the Split collection)
    // Required: No
    split: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Split",
        required: false,
    },
    
    // name field:
    // This field stores the name of the workout.
    // It is required to ensure that each workout has a descriptive name.
    // Type: String
    // Required: Yes
    name: {
        type: String,
        required: true,
    },
    
    // exercises field:
    // This field stores an array of exercises included in the workout.
    // It is required to ensure that each workout has at least one exercise associated with it.
    // Type: Array
    // Required: Yes
    exercises: {
        type: Array,
        required: true,
    },
});

// Compiling the Workout model:
// The mongoose.model() function creates a Mongoose model based on the WorkoutSchema.
// This model allows us to interact with the 'workouts' collection in the MongoDB database, performing operations such as creating, reading, updating, and deleting workout documents.
module.exports = mongoose.model("Workout", WorkoutSchema);
