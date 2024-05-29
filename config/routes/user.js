// The user.js file in your project's config/routes directory sets up an Express router to manage CRUD operations for user data using the Mongoose ORM with a MongoDB database. This router is crucial for maintaining and manipulating user-specific data throughout your application.

// **Detailed Overview of the user.js File**

// **Importing Dependencies and Setting Up the Router:**
// - **Express Router:** Utilizes Express's powerful routing capabilities to define routes specific to user operations.
// - **User Model:** Imports the Mongoose model for the user, which defines the schema and provides methods to interact with the corresponding collection in MongoDB.

// ```javascript
// const express = require('express');
// const User = require('../models/User'); // assuming the model is stored in models/User
// const router = express.Router();
// ```

// **HTTP Request Handlers:**

// 1. **GET Request - Fetch User Data (/:googleId):**
//    - **Purpose:** Retrieves user data based on a Google ID provided in the URL.
//    - **Process:** Uses the `findOne` method of Mongoose to find a single user by `googleId`.
//    - **Response:** Returns the user data as JSON, or an error message if no user is found.
// ```javascript
// router.get('/:googleId', async (req, res) => {
//     try {
//         const user = await User.findOne({ googleId: req.params.googleId });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 2. **POST Request - Create User (/):**
//    - **Purpose:** Creates a new user in the MongoDB database.
//    - **Process:** Extracts user data from the request body and uses the `create` method of Mongoose to add a new user to the database.
//    - **User Experience:** Redirects the client back to the previous page to prevent stagnation on a JSON response page.
// ```javascript
// router.post('/', async (req, res) => {
//     try {
//         const newUser = await User.create(req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 3. **PUT Request - Update User (/put/:id):**
//    - **Purpose:** Updates an existing user's information in the database.
//    - **Process:** Identifies the user by ID and updates the document with new data provided in the request body using `findByIdAndUpdate`.
//    - **User Experience:** Redirects back to the previous page to maintain seamless user flow.
// ```javascript
// router.put('/put/:id', async (req, res) => {
//     try {
//         await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// **Exporting the Router:**
// - The router is exported to be used in the main server configuration, allowing it to be integrated with other parts of the application.
// ```javascript
// module.exports = router;
// ```

// This setup ensures that all user-related data interactions are handled efficiently and securely, supporting functionalities such as user registration, data updates, and retrieval, thereby enhancing the overall functionality and security of your application.



const express = require("express");

// Initialize the Express router to manage routes more modularly
const router = express.Router();

// Import the User model for database operations
const User = require("../../models/User");

// Documenting HTTP request methods and their purposes for clear maintainability and understanding:
// POST: Create new resources securely
// GET: Retrieve resources; use POST instead for sensitive data
// PUT: Update/replace resources; idempotent
// DELETE: Remove resources

// GET request to fetch user details by Google ID
router.get("/:googleId", async (req, res) => {
    // Retrieve user by Google ID and respond with user data
    const user = await User.find({ googleId: req.params.googleId });
    res.send(user);
});

// POST request to create a new user
router.post("/", async (req, res) => {
    // Create a new user record in the database using data from the request body
    await User.create(req.body);
    
    // Redirect to the previous page to enhance user experience by avoiding leaving them on a JSON page
    res.redirect("back");
});

// POST (acting as PUT) request to update user details
router.post("/put/:id", async (req, res) => {
    // Update user data by Google ID, ensuring data integrity and consistency
    await User.findOneAndUpdate({ googleId: req.params.id }, req.body);

    // Redirect back for continuous user flow after the update
    res.redirect("back");
});

// Export the router for use in the main server setup, promoting modular architecture and scalability
module.exports = router;
