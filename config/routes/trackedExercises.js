// The trackedExercises.js file within your project is a crucial component of the server-side setup, designed to manage CRUD operations for the "TrackedExercises" schema using MongoDB and the Express framework. This router facilitates interaction between the frontend of your fitness application and the MongoDB database, ensuring users can manage their tracked exercises effectively.

// **Detailed Breakdown of the trackedExercises.js File**

// **Importing Dependencies:**
// - **express**: Essential for creating the router to handle HTTP requests.
// - **TrackedExercises Model**: The Mongoose model which interfaces with the trackedExercises collection in the MongoDB database.

// ```javascript
// const express = require('express');
// const TrackedExercises = require('../models/TrackedExercises');
// const router = express.Router();
// ```

// **Router Setup:**
// An Express router is initialized to define routes that handle different operations related to tracked exercises.

// **HTTP Request Handlers:**

// 1. **GET Request - Fetch Tracked Exercises (/:googleId):**
//    - **Purpose:** Retrieves all tracked exercises associated with a specific Google ID.
//    - **Process:** Uses MongoDB's find method to query tracked exercises by `googleId`.
//    - **Security Note:** Suitable for fetching data without altering the database state.
// ```javascript
// router.get('/:googleId', async (req, res) => {
//     try {
//         const exercises = await TrackedExercises.find({ googleId: req.params.googleId });
//         res.json(exercises);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 2. **POST Request - Create Tracked Exercise (/):**
//    - **Purpose:** Adds a new entry to the tracked exercises collection.
//    - **Process:** Accepts data from the request body to create a new tracked exercise document.
//    - **User Experience:** Redirects to the previous page to maintain user context.
// ```javascript
// router.post('/', async (req, res) => {
//     const newExercise = new TrackedExercises(req.body);
//     try {
//         await newExercise.save();
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 3. **PUT Request - Update Tracked Exercise (/put/:id):**
//    - **Purpose:** Modifies an existing tracked exercise document.
//    - **Process:** Updates the document by its _id with the provided data.
//    - **User Experience:** Redirects back to enhance continuous user flow.
// ```javascript
// router.put('/put/:id', async (req, res) => {
//     try {
//         await TrackedExercises.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 4. **DELETE Request - Remove Tracked Exercise (/delete/:id):**
//    - **Purpose:** Deletes a tracked exercise from the database.
//    - **Process:** Identifies the exercise by its _id and removes it.
//    - **User Experience:** Redirects post-deletion to prevent the user from seeing a raw JSON page.
// ```javascript
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         await TrackedExercises.findByIdAndDelete(req.params.id);
//         res.redirect('back');
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// **Exporting the Router:**
// The router is exported to integrate with the main server setup, enabling these routes to be used application-wide.
// ```javascript
// module.exports = router;
// ```

// This file not only provides the backend support needed for CRUD operations on tracked exercises but also enhances user experience by ensuring smooth transitions and immediate feedback within the application.


const express = require("express");

// Initialize the Express router to define routes for HTTP requests:
const router = express.Router();

// Importing the TrackedExercises model which interacts with the MongoDB database using Mongoose:
const TrackedExercises = require("../../models/TrackedExercises");

/*
HTTP Requests summary:

1) POST = create:
    - Safer than GET as parameters are included in the request body, not in the URL.
    - Ideal for creating new resources on the server.

2) GET = read:
    - Retrieves data from the server.
    - Data is included in the URL, thus not suitable for sensitive data.

3) PUT = update/replace:
    - Updates existing resources and is idempotent, meaning repeated calls produce the same result.

4) DELETE = delete:
    - Removes resources from the server.
*/

// GET request to fetch tracked exercises by a specific user identified by googleId:
router.get("/:googleId", async (req, res) => {
    // Querying the database to find all tracked exercises associated with the provided googleId:
    const trackedExercises = await TrackedExercises.find({ googleId: req.params.googleId });
    // Sending the found exercises back to the client:
    res.send(trackedExercises);
});

// POST request to create a new tracked exercise:
router.post("/", async (req, res) => {
    // Creating a new exercise document in the database using data from the request body:
    await TrackedExercises.create(req.body);
    // Redirecting the client back to the previous page to improve user experience:
    res.redirect("back");
});

// PUT request to update an existing tracked exercise:
router.post("/put/:id", async (req, res) => {
    // Updating the tracked exercise by its document ID with new data provided in the request body:
    await TrackedExercises.findOneAndUpdate({ _id: req.params.id }, req.body);
    // Redirecting back to the previous page to maintain user context:
    res.redirect("back");
});

// DELETE request to remove a tracked exercise:
router.post("/delete/:id", async (req, res) => {
    // Deleting the tracked exercise specified by its document ID:
    await TrackedExercises.findOneAndDelete({ _id: req.params.id });
    // Redirecting the user back to the previous page after the operation:
    res.redirect("back");
});

// Exporting the router to be used in other parts of the application:
module.exports = router;
