// The workout.js file in your project's config/routes directory is essential for handling workout-related data operations within your fitness application. It uses Express and Mongoose to interact with the MongoDB database, ensuring that workout data is efficiently managed. Here is a detailed guide on the functionality of each route defined in this file:

// **Setup and Dependencies**
// - **Express Router:** Utilizes Express's powerful routing capabilities.
// - **Workout Model:** The Mongoose model 'Workout' interacts with the workout collection in MongoDB, handling the data structure and database operations.

// ```javascript
// const express = require('express');
// const Workout = require('../models/Workout');
// const router = express.Router();
// ```

// **HTTP Request Handlers**

// 1. **GET Request - Fetch Workouts by googleId (/:googleId):**
//    - **Purpose:** Retrieves all workouts associated with a specific Google ID.
//    - **Process:** Uses the `find` method of Mongoose to search for all workout documents that match the given Google ID.
//    - **Response:** Outputs the fetched workouts as JSON.
// ```javascript
// router.get('/:googleId', async (req, res) => {
//     try {
//         const workouts = await Workout.find({ googleId: req.params.googleId });
//         res.json(workouts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 2. **GET Request - Fetch Specific Workout by ID (/:googleId/:id):**
//    - **Purpose:** Fetches a particular workout by both Google ID and MongoDB _id.
//    - **Process:** Adds an additional filter for the workout's unique ID to locate a specific entry.
//    - **Response:** Returns the specific workout data as JSON.
// ```javascript
// router.get('/:googleId/:id', async (req, res) => {
//     try {
//         const workout = await Workout.findOne({ googleId: req.params.googleId, _id: req.params.id });
//         res.json(workout);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 3. **POST Request - Create Workout (/):**
//    - **Purpose:** Adds a new workout to the MongoDB database.
//    - **Process:** Takes the data from the request body to create a new document in the Workout collection.
//    - **Response:** Outputs the newly created workout document as JSON, confirming the addition.
// ```javascript
// router.post('/', async (req, res) => {
//     const newWorkout = new Workout(req.body);
//     try {
//         await newWorkout.save();
//         res.json(newWorkout);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 4. **PUT Request - Update Workout (/put/:id):**
//    - **Purpose:** Modifies an existing workout document based on its _id.
//    - **Process:** Identifies the workout by ID and updates it with the new data provided in the request body.
//    - **Response:** After updating, redirects back to the previous page to maintain user flow.
// ```javascript
// router.put('/put/:id', async (req, res) => {
//     try {
//         await Workout.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 5. **DELETE Request - Remove Workout (/delete/:id):**
//    - **Purpose:** Deletes a specific workout using its MongoDB _id.
//    - **Process:** Locates and removes the workout document corresponding to the specified _id.
//    - **Response:** Redirects to the previous page to ensure a smooth user experience.
// ```javascript
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         await Workout.findByIdAndDelete(req.params.id);
//         res.redirect('back');
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// **Exporting the Router:**
// - The router is exported to be integrated into the main server configuration, making these routes available throughout the application.
// ```javascript
// module.exports = router;
// ```

// This routing file is fundamental for the efficient management of workout data within your application, providing comprehensive functionalities for creating, retrieving, updating, and deleting workout records.



const express = require("express");
const router = express.Router(); // Express router to define routes.

// Importing the Workout model to interact with the Workout collection in MongoDB.
const Workout = require("../../models/Workout");

/*
HTTP Request Methods Explanation:
1) POST: Used to create new resources. Safer than GET because data is not stored in browser history or server logs.
2) GET: Retrieves data. Less secure than POST as data is included in the URL.
3) PUT: Used to update/replace existing resources. PUT requests are idempotent, meaning multiple identical requests should have the same effect as a single request.
4) DELETE: Used to remove existing resources.
*/

// Route to get all workouts for a specific user identified by googleId.
router.get("/:googleId", async (req, res) => {
    // Query the database for all workouts matching the googleId provided in the URL.
    const workouts = await Workout.find({ googleId: req.params.googleId });
    res.send(workouts); // Send the retrieved workouts back to the client.
});

// Route to get a specific workout by a combination of googleId and workout's MongoDB ObjectId.
router.get("/:googleId/:id", async (req, res) => {
    // Retrieve a specific workout using both the googleId and the workout's unique ID from the database.
    const workouts = await Workout.find({ googleId: req.params.googleId, _id: req.params.id });
    res.send(workouts); // Send the found workout back to the client.
});

// Route to create a new workout.
router.post("/", async (req, res) => {
    // Create a new workout document in MongoDB using the provided body data.
    const result = await Workout.create(req.body);
    res.send(result); // Return the newly created workout document to the client.
});

// Route to update an existing workout identified by MongoDB ObjectId.
router.post('/put/:id', async (req, res) => {
    // Update the workout document where _id matches req.params.id with the new data provided in req.body.
    await Workout.findOneAndUpdate({_id: req.params.id}, req.body);
    res.redirect('back'); // Redirect the user back to the referring page to maintain user context.
});

// Route to delete an existing workout identified by MongoDB ObjectId.
router.post('/delete/:id', async (req, res) => {
    // Delete the workout document where _id matches req.params.id.
    await Workout.findOneAndDelete({_id: req.params.id});
    res.redirect('back'); // Redirect the user back to the referring page to prevent staying on a deleted resource's page.
});

module.exports = router; // Export the router to be mounted by the main application.
