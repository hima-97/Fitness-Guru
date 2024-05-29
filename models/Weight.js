// The Weight.js file in your models directory is crucial for managing weight-related data within your MongoDB database using Mongoose. This model is specifically designed to store information about the weight lifted for a given set of repetitions during an exercise. Here’s a detailed breakdown of the schema definition and its role within your application:

// **Schema Definition**
// The WeightSchema is defined using Mongoose's Schema constructor. It includes fields to capture the essential data related to weight entries:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const WeightSchema = new Schema({
//     repetitions: {
//         type: Schema.Types.ObjectId,
//         ref: 'Repetitions',
//         required: false,
//         description: "Stores the ID of the repetitions associated with this weight entry, referencing the Repetitions model to establish a relationship between weights and repetitions."
//     },
//     weight: {
//         type: Number,
//         required: true,
//         description: "Stores the weight value in pounds (or other units). This field is required to ensure that each weight entry has an associated value."
//     },
//     date: {
//         type: String,
//         required: true,
//         description: "Stores the date when the weight was lifted, required to track progress over time."
//     }
// });
// ```

// **Model Compilation**
// The defined schema is compiled into a Mongoose model named 'Weight'. This model enables CRUD operations on the weights collection within the MongoDB database:

// ```javascript
// const Weight = mongoose.model('Weight', WeightSchema);
// ```

// **Use in Application**
// By exporting the Weight model, it becomes accessible throughout your application, allowing various modules to interact with the weight data:

// ```javascript
// module.exports = Weight;
// ```

// **Application Impact**
// - **Relational Data Management:** The repetitions field, referencing the Repetitions model, ensures that weight entries are linked to specific sets of repetitions, maintaining relational integrity within the database.
// - **Progress Tracking:** The weight and date fields are essential for tracking user progress over time, enabling users to see improvements and make data-driven adjustments to their training routines.
// - **Comprehensive Data Handling:** The Weight model supports robust CRUD operations, allowing users to add, update, retrieve, and delete weight entries, which is critical for maintaining an accurate log of their lifting progress.


const mongoose = require("mongoose");

// Defining the schema for the "Weight" model:
// The schema defines the structure of documents within the "weights" collection in MongoDB.
// Each field in the schema is defined with a specific type and other properties.

const WeightSchema = new mongoose.Schema({
    // The "repetitions" field:
    // This field stores a reference to a document in the "Repetitions" collection.
    // It links each weight entry to a specific set of repetitions.
    // Type: ObjectId (a unique identifier for referencing other documents)
    // Reference: "Repetitions" model
    // Required: false (this field is optional)
    repetitions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repetitions",
        required: false,
    },
    // The "weight" field:
    // This field stores the weight value lifted by the user.
    // Type: Number (should be a numeric value)
    // Required: true (this field must be present for each weight entry)
    weight: {
        type: Number,
        required: true,
    },
    // The "date" field:
    // This field stores the date when the weight was lifted.
    // Type: String (should be in a date format, e.g., "YYYY-MM-DD")
    // Required: true (this field must be present for each weight entry)
    date: {
        type: String,
        required: true,
    }
});

// Compiling the schema into a model:
// The model represents the "weights" collection in the database and provides an interface for interacting with it.
// The model is created using mongoose.model("Weight", WeightSchema).
// This allows the model to be imported and used in other parts of the application for creating, reading, updating, and deleting weight records.

module.exports = mongoose.model("Weight", WeightSchema);
