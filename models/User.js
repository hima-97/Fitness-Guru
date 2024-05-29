// The User.js file in your models directory is essential for managing user data within your MongoDB database using Mongoose. This model defines the structure for storing and handling user-related information, such as profile details and physical statistics. Below is a detailed explanation of the schema definition and its role within your application:

// **Schema Definition**
// The UserSchema is defined using Mongoose's Schema constructor. It includes various fields to capture comprehensive user data:

// ```javascript
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     googleId: {
//         type: String,
//         required: false,
//         description: "Stores the Google ID of the user, uniquely identifying each user and linking their profile to their Google account."
//     },
//     dateOfBirth: {
//         type: String,
//         required: false,
//         description: "Stores the user's date of birth for age-related features or personalization."
//     },
//     heightFeet: {
//         type: Number,
//         required: false,
//         description: "Stores the user's height in feet, part of their physical statistics."
//     },
//     heightInches: {
//         type: Number,
//         required: false,
//         description: "Stores the user's height in inches, completing the height measurement when combined with heightFeet."
//     },
//     weight: {
//         type: Number,
//         required: false,
//         description: "Stores the user's weight in pounds, part of their physical statistics."
//     },
//     notes: {
//         type: String,
//         required: false,
//         description: "Stores additional notes or comments related to the user for various purposes."
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         description: "Stores the date and time when the user profile was created, defaulting to the current date and time."
//     },
//     profilePic: {
//         type: String,
//         default: 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
//         description: "Stores the URL of the user's profile picture, defaulting to a placeholder image if not provided."
//     }
// });
// ```

// **Model Compilation**
// The schema is compiled into a model named 'User' using the following command. This model facilitates interactions with the users collection in the MongoDB database:

// ```javascript
// const User = mongoose.model('User', UserSchema);
// ```

// **Use in Application**
// By exporting the User model, it becomes accessible throughout your application, enabling various modules to interact with user data:

// ```javascript
// module.exports = User;
// ```

// **Application Impact**
// - **User Identification:** The googleId field ensures each user's profile is uniquely identifiable and linked to their Google account.
// - **Comprehensive User Data:** Fields like dateOfBirth, heightFeet, heightInches, and weight allow the application to store detailed physical statistics for each user.
// - **Personalization:** The notes and profilePic fields provide additional customization and personalization options for user profiles.
// - **Timestamps:** The createdAt field helps in tracking user registration dates, useful for auditing and user engagement metrics.
// - **Data Management:** The User model supports robust CRUD operations, enabling the creation, retrieval, update, and deletion of user profiles, which is essential for managing personalized experiences and functionalities.



const mongoose = require("mongoose");

// Defining schema:
// The UserSchema defines the structure of the User documents within the MongoDB collection.
// Each field in the schema is defined with a specific type, and some fields include additional validation rules or default values.
const UserSchema = new mongoose.Schema({
    // Google ID of the user, used for authentication and identification.
    googleId: {
        type: String,
        required: false, // This field is optional.
    },
    // User's date of birth, stored as a string in the format 'YYYY-MM-DD'.
    dateOfBirth: {
        type: String,
        required: false, // This field is optional.
    },
    // User's height in feet.
    heightFeet: {
        type: Number,
        required: false, // This field is optional.
    },
    // User's height in inches.
    heightInches: {
        type: Number,
        required: false, // This field is optional.
    },
    // User's weight in pounds.
    weight: {
        type: Number,
        required: false, // This field is optional.
    },
    // Additional notes about the user.
    notes: {
        type: String,
        required: false, // This field is optional.
    },
    // Date when the user profile was created. Defaults to the current date and time when a new user document is created.
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date and time.
    },
    // URL of the user's profile picture. Defaults to a placeholder image if not provided.
    profilePic: {
        type: String,
        default: 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg', // Default profile picture URL.
    },
});

// Compiling the model:
// The mongoose.model() function creates a model based on the provided schema.
// The first argument is the name of the model ('User'), which Mongoose uses to create the collection name (lowercased and pluralized, i.e., 'users').
// The second argument is the schema used to create the model.
module.exports = mongoose.model("User", UserSchema);
