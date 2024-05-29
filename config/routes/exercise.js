// The exercise.js file in your project's routes directory provides an Express router setup to manage CRUD operations for the "Exercise" data model within your MongoDB database. This setup allows your application to interact with exercise data through well-defined API endpoints.

// **Detailed Explanation of exercise.js**

// **Importing Necessary Modules:**
// - `express`: The Express framework is essential for creating the router instance.
// - `Exercise`: This Mongoose model represents the exercise schema which outlines the structure of exercise documents in your MongoDB.

// **Code Example:**
// ```javascript
// const express = require('express');
// const Exercise = require('../models/Exercise');
// const router = express.Router();
// ```

// **Router Definitions:**
// - **Router instance:** An Express router is set up to handle paths specific to exercise data.

// **Route Handlers:**
// 1. **GET Request - Retrieve Exercises (/):**
//    - Fetches all exercises associated with a specific Google ID.
//    - Uses Mongoose’s `find` method, filtering exercises by `googleId`.
// ```javascript
// router.get('/:googleId', async (req, res) => {
//     try {
//         const exercises = await Exercise.find({ googleId: req.params.googleId });
//         res.json(exercises);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 2. **POST Request - Create Exercise (/):**
//    - Handles the creation of a new exercise.
//    - Receives exercise data in the request body to create a new document in the database.
// ```javascript
// router.post('/', async (req, res) => {
//     const exercise = new Exercise(req.body);
//     try {
//         const newExercise = await exercise.save();
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 3. **PUT Request - Update Exercise (/update/:id):**
//    - Updates an existing exercise document using its ID.
//    - Receives updated data in the request body.
// ```javascript
// router.put('/update/:id', async (req, res) => {
//     try {
//         await Exercise.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 4. **DELETE Request - Delete Exercise (/delete/:id):**
//    - Deletes an exercise document based on its ID.
// ```javascript
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         await Exercise.findByIdAndDelete(req.params.id);
//         res.redirect('back');
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// **Redirect Behavior:**
// - Each POST, PUT, and DELETE operation uses `res.redirect("back")` to return the user to their previous page. This enhances user experience by maintaining interaction flow and providing immediate feedback.

// **Benefits:**
// - **Consistent Data Interface:** Standardizes interactions with exercise data across the application.
// - **Enhanced User Experience:** Provides smooth, error-free data operations and redirects to maintain user engagement.
// - **Scalability and Maintenance:** Centralizing CRUD operations in one router makes the application easier to scale and maintain.

// **Exporting Router:**
// The configured router is exported to be used in your application’s server setup, integrating it with other routes and middleware.
// ```javascript
// module.exports = router;
// ```

// This file is critical for managing the backend logic related to exercise data and forms a core part of the server-side functionality, ensuring robust data management and application integrity.



// Import the Express framework, a robust tool for creating server-side applications and APIs in Node.js.
const express = require("express");

// Create a new router object to handle routes. Routers are mini-applications capable of performing middleware and routing functions.
const router = express.Router();

// Import the Exercise model which defines the schema for the 'Exercise' documents in the MongoDB database.
const Exercise = require("../../models/Exercise");

/*
HTTP Requests:
1) POST = create
   - Safer than GET for sensitive operations as the data does not appear in URL or server logs.
2) GET = read
   - Used for retrieving data. Data is included in the URL, making it less secure for sensitive information.
3) PUT = update/replace
   - Idempotent, meaning the same request can be called multiple times without different outcomes.
4) DELETE = delete
   - Used for removing data.
*/

// GET request to fetch exercises associated with a specific Google ID.
// :googleId is a placeholder in the URL for a dynamic value that is passed as a parameter.
router.get("/:googleId", async (req, res) => {
    // Await the asynchronous operation of finding exercises by googleId in the database.
    const exercises = await Exercise.find({ googleId: req.params.googleId });

    // Send the retrieved exercises back to the client.
    res.send(exercises);
});

// POST request to create a new exercise.
router.post("/", async (req, res) => {
    // Create a new exercise document in the MongoDB database using the data provided in the request body.
    await Exercise.create(req.body);

    // Redirect the client to the previous page they were on, enhancing user experience by making the transition seamless.
    res.redirect("back");
});

// PUT request to update an existing exercise.
// Note: This is actually implemented with a POST method to accommodate forms that do not support PUT directly.
router.post("/put/:id", async (req, res) => {
    // Update the exercise identified by the ID in the URL with new data provided in the request body.
    await Exercise.findOneAndUpdate({ _id: req.params.id }, req.body);

    // Redirect the client to the previous page, similarly to above.
    res.redirect("back");
});

// DELETE request to remove an existing exercise.
router.post("/delete/:id", async (req, res) => {
    // Delete the exercise identified by the ID.
    await Exercise.findOneAndDelete({ _id: req.params.id });

    // Redirect the client to the previous page after deletion.
    res.redirect("back");
});

// Export the router so it can be included and used in other parts of the application, like the main server file.
module.exports = router;
