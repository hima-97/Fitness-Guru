// The Repetitions.js file in your project's models directory is critical for defining the Mongoose schema associated with the Repetitions model in your MongoDB database. This model plays a vital role in tracking the performance of exercises over sessions, particularly useful in fitness applications that monitor user progress and exercise effectiveness. Here's a detailed breakdown of the schema's configuration and its role within the application:

// **Schema Definition**
// Utilizing Mongoose's Schema constructor, the RepetitionsSchema is designed to store and manage data related to the repetitions of exercises tracked by users. It includes fields that ensure detailed tracking and association with specific exercises.

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const RepetitionsSchema = new Schema({
//     weights: {
//         type: Schema.Types.ObjectId,
//         ref: 'TrackedExercises',
//         required: false,
//         description: "Links each repetition entry to a specific exercise tracked, using MongoDB's ObjectId to create a reference rather than duplicating data."
//     },
//     repetitions: {
//         type: Number,
//         required: true,
//         description: "Records the number of repetitions performed, essential for evaluating progress and adherence to training regimens."
//     }
// });
// ```

// **Model Compilation**
// After defining the schema, it is compiled into a model called 'Repetitions'. This model facilitates the creation, reading, updating, and deletion of documents within the MongoDB database, specifically within the collection dedicated to repetitions.

// ```javascript
// const Repetitions = mongoose.model('Repetitions', RepetitionsSchema);
// ```

// **Use in Application**
// Exporting the model makes it available for use across the application, allowing other modules to interact with the repetitions data efficiently.

// ```javascript
// module.exports = Repetitions;
// ```

// **Functional Implications**
// The integration of the Repetitions model provides significant functionality:
// - **Data Normalization and Integrity:** By referencing the TrackedExercises model, it prevents data duplication and maintains integrity across user sessions.
// - **Progress Tracking:** Essential for applications focusing on fitness, where monitoring the increment or consistency in repetitions can indicate improvement or need for adjustment in user workouts.
// - **Flexible Data Interaction:** Supports robust CRUD operations, enabling dynamic user interactions such as updating their performance or reviewing past exercises.

// **Conclusion**
// By defining this schema and its functionalities, the Repetitions model serves as a foundational component for managing detailed exercise data, crucial for any fitness application aimed at delivering measurable and trackable results to its users. This setup ensures that exercise data is not only stored efficiently but is also meaningful in the context of user goals and fitness plans.

// Import the Mongoose library to facilitate interactions with MongoDB.
const mongoose = require("mongoose");

/**
 * Define the schema for the "Repetitions" model.
 * A schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 * 
 * Fields:
 * - weights: Reference to a TrackedExercise document, indicating which exercise these repetitions are associated with.
 * - repetitions: Numeric value representing how many times an exercise was performed.
 */
const RepetitionsSchema = new mongoose.Schema({
    // 'weights' serves as a reference to the associated exercise. Although it's called 'weights',
    // it's actually linking to a TrackedExercises entry. This field is not required by default, 
    // which allows for flexibility in record creation, perhaps in scenarios where repetitions need 
    // to be recorded before linking them to a specific exercise.
    weights: {
        type: mongoose.Schema.Types.ObjectId, // Uses ObjectId, which is the default ID in MongoDB, to reference another document.
        ref: "TrackedExercises", // Establishes a relationship with the TrackedExercises model.
        required: false // This field is optional, making the schema flexible.
    },
    // 'repetitions' is a required field as every repetition entry must record the number of times an exercise was performed.
    repetitions: {
        type: Number, // Stores numeric data, suitable for counting repetitions.
        required: true // This field is mandatory, ensuring data integrity.
    }
});

// Compile the schema into a model. A model is a class with which we construct documents.
// In this case, each document will be a Repetitions with properties and behaviors as declared in our schema.
module.exports = mongoose.model("Repetitions", RepetitionsSchema);
