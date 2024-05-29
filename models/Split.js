// The Split.js file in your models directory is crucial for managing workout splits in your MongoDB database via Mongoose. A "Split" is a collection of workouts organized under a common theme or goal, crucial for structuring fitness programs. Here’s a detailed breakdown of the schema's configuration and its implications for your application:

// **Schema Definition**
// Mongoose's Schema constructor is used to define the structure of the Split entity, which includes several key fields:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const SplitSchema = new Schema({
//     googleId: {
//         type: String,
//         required: false,
//         description: "Stores the Google ID of the user who created the split. Optional for flexibility in user management."
//     },
//     name: {
//         type: String,
//         required: true,
//         description: "Essential for identifying different splits within the application. Each split must have a unique name."
//     },
//     workouts: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Workout',
//         required: false,
//         description: "Array of ObjectId references to the Workout model, linking multiple workouts to a single split."
//     }],
//     notes: {
//         type: String,
//         required: false,
//         description: "Optional field for additional details about the split such as goals or training instructions."
//     },
//     public: {
//         type: Boolean,
//         required: false,
//         default: false,
//         description: "Indicates whether the split is public or private, defaulting to private for enhanced privacy."
//     }
// });
// ```

// **Model Compilation**
// The defined schema is then compiled into a model, which acts as a blueprint for creating, querying, updating, and deleting split documents in the MongoDB database:

// ```javascript
// const Split = mongoose.model('Split', SplitSchema);
// ```

// **Use in Application**
// By exporting the Split model, it becomes available for use throughout your application, facilitating interactions with split data:

// ```javascript
// module.exports = Split;
// ```

// **Application Impact**
// - **Data Management:** The Split model supports robust data management functionalities, allowing users to create personalized workout regimes.
// - **User Interaction:** Through the model, users can easily define, modify, and track their workout splits, enhancing user engagement and satisfaction.
// - **Privacy Control:** The public/private setting in the Split model allows users to control the visibility of their workout plans, accommodating both individual privacy needs and community sharing preferences.

// **Conclusion**
// The Split model not only structures workout splits but also enhances the functionality and user experience of your fitness application. By defining clear relations between workouts and allowing for detailed descriptions and privacy settings, it supports both personal fitness goals and community interactions within your app.


const mongoose = require("mongoose");

/**
 * Schema Definition for the Split model:
 * This schema defines the structure of the Split documents within the MongoDB database.
 * It includes various fields each with type definitions and attributes such as required or default values.
 */

// Creating a new schema for our Split model with detailed attributes:
const SplitSchema = new mongoose.Schema({
    // googleId is optionally used to associate this split with a specific user's Google account.
    googleId: {
        type: String,       // Expected data type is String.
        required: false     // This field is not mandatory.
    },
    // name is a required field, used to store the name of the workout split.
    name: {
        type: String,       // Expected data type is String.
        required: true      // This field is mandatory.
    },
    // workouts is an array that stores a collection of workouts associated with this split.
    workouts: {
        type: Array,        // Expected data type is Array.
        required: false     // This field is not mandatory, splits may not include any workouts initially.
    },
    // notes can store additional information about the split, like goals or methodologies.
    notes: {
        type: String,       // Expected data type is String.
        require: false      // This field is optional.
    },
    // public indicates the visibility of the split, whether it's publicly accessible or private.
    public: {
        type: String,       // Expected data type is String.
        require: false,     // This field is optional.
        default: "false"    // Default setting for new splits is 'false' (private).
    },
});

/**
 * Model Compilation:
 * This line compiles the schema into a model that includes built-in CRUD operations for easy database interactions.
 * The model is then exported so it can be imported and utilized in other parts of the application to interact with the 'splits' collection.
 */
module.exports = mongoose.model("Split", SplitSchema);
