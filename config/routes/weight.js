// Adding API endpoint route for "Weight" schema, so the server can be used to perform the CRUD (create, read, update, delete) operations for the "Weight" schema in the MongoDB database
// This code exports an Express router that handles the CRUD (create, read, update, delete) operations for the "Weight" schema in the MongoDB database


// The weight.js file in the config/routes directory sets up the routing logic for handling weight-related operations in a Node.js application using Express. It manages interactions with MongoDB through Mongoose models for weights, repetitions, and tracked exercises. Here’s a breakdown of the routes defined in this file:

// Dependencies and Setup
// Express Router: Utilizes Express's router to manage routes specific to weight data operations.
// Weight Model: Imports the Mongoose model Weight which interacts with the MongoDB collection for storing weight data.
// Repetitions Model: Imports the Mongoose model Repetitions, related to the repetitions associated with weights.
// Tracked Exercises Model: Imports the Mongoose model TrackedExercises which is related to the exercises being tracked.
// HTTP Request Handlers
// GET Request (/:repetitionsId):

// Purpose: Fetches weight entries based on a repetitionsId provided as a URL parameter.
// Process: Uses Mongoose's find method to retrieve weight data that matches the provided repetitionsId.
// Response: Sends the fetched weight data as a response to the client.
// POST Request (/):

// Purpose: Creates a new weight entry in the database.
// Process: Takes data from the request body to create a new document in the Weight collection.
// User Experience: After creation, redirects back to the referring page, enhancing user experience by not leaving them on a JSON response page.
// Custom POST Request (/log/:name):

// Purpose: Handles the creation of a new weight log, and if necessary, creates new entries for the associated tracked exercise and repetition.
// Process: First, it checks for an existing tracked exercise by name and user ID. If none exists, it creates one. It then checks for an existing repetition by weight ID and repetition number. If none exists, it creates one. Finally, it creates a new weight entry with the provided data.
// Response: Redirects to the previous page, maintaining user flow.
// PUT Request (/put/:id):

// Purpose: Updates an existing weight entry.
// Process: Finds a weight entry by its ID and updates it with the data sent in the request body. This route uses POST to handle a traditional PUT operation (likely due to HTML form method limitations).
// Response: Redirects back to the referring page after updating.
// DELETE Request (/delete/:id):

// Purpose: Deletes an existing weight entry.
// Process: Deletes a weight entry identified by its ID.
// Response: Redirects back to the previous page, smoothing user interaction.


const express = require("express");

// Initialize an Express router to define routes for this specific part of the app
const router = express.Router();

// Import the Mongoose models to interact with the corresponding collections in the MongoDB database
const TrackedExercises = require("../../models/TrackedExercises");
const Repetitions = require("../../models/Repetitions");
const Weight = require("../../models/Weight");

/*
Explanation of HTTP Request Types:
- POST: Creates data. Safer for sensitive data as it does not get stored in URL.
- GET: Retrieves data. Should not be used for sensitive data.
- PUT: Updates/replaces data. Idempotent, meaning multiple identical requests will have the same effect as one request.
- DELETE: Removes data.
*/

// Retrieve weight entries by a specific repetitions ID
router.get("/:repetitionsId", async (req, res) => {
    // Find all weight records that match the repetitions ID provided in the route parameter
    const weight = await Weight.find({ repetitions: req.params.repetitionsId });
    // Send the retrieved weight data back to the client
    res.send(weight);
});

// Create a new weight entry
router.post("/", async (req, res) => {
    // Create a new document in the Weight collection using the data provided in the request body
    await Weight.create(req.body);
    // Redirect the client back to the previous page to enhance user experience and prevent data re-submission
    res.redirect("back");
});

// Create new weight log along with associated tracked exercise and repetitions if they don't exist
router.post("/log/:name", async (req, res) => {
    // Check if a tracked exercise with the given name and user ID exists, if not, create a new one
    let trackedExercise = await TrackedExercises.findOne({ name: req.params.name, googleId: req.body.googleId });
    if (trackedExercise === null) {
        const newTrackedExercise = new TrackedExercises({
            googleId: req.body.googleId,
            name: req.params.name
        });
        trackedExercise = await TrackedExercises.create(newTrackedExercise);
    }

    // Check if a repetition with the specified tracked exercise ID and repetition count exists, if not, create a new one
    let repetition = await Repetitions.findOne({ weights: trackedExercise._id, repetitions: req.body.Repetitions });
    if (repetition === null) {
        const newRepetition = new Repetitions({
            weights: trackedExercise._id,
            repetitions: req.body.Repetitions
        });
        repetition = await Repetitions.create(newRepetition);
    }

    // Create a new weight document linked to the repetition ID
    const weight = new Weight({
        repetitions: repetition._id,
        weight: req.body.Weight,
        date: req.body.date
    });
    await Weight.create(weight);
    // Redirect back to the previous page
    res.redirect("back");
});

// Update an existing weight entry
router.post("/put/:id", async (req, res) => {
    // Update the weight document with the ID provided in the route parameter using the data sent in the request body
    await Weight.findOneAndUpdate({ _id: req.params.id }, req.body);
    // Redirect back to the previous page
    res.redirect("back");
});

// Delete an existing weight entry
router.post("/delete/:id", async (req, res) => {
    // Delete the weight document with the ID provided in the route parameter
    await Weight.findOneAndDelete({ _id: req.params.id });
    // Redirect back to the previous page
    res.redirect("back");
});

// Export the router to be mounted by the main application
module.exports = router;
