// The split.js file in your project's server directory establishes an Express router for handling CRUD operations on the "Split" schema in your MongoDB database. This schema likely manages workout splits, crucial for users to organize their workout routines effectively. Here is a detailed breakdown of how this router manages data for workout splits:

// **Importing Dependencies and Router Setup:**
// - **express:** Used for creating the router instance.
// - **Split:** The Mongoose model for the splits, interacting with the MongoDB database.

// ```javascript
// const express = require('express');
// const Split = require('../models/Split');
// const router = express.Router();
// ```

// **Router Definitions:**

// 1. **GET Request - Fetch Public Splits (/public):**
//    - Retrieves all workout splits marked as public, allowing them to be viewed by any user of the application.
// ```javascript
// router.get('/public', async (req, res) => {
//     try {
//         const publicSplits = await Split.find({ public: true });
//         res.json(publicSplits);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 2. **GET Request - Fetch User Splits (/:googleId):**
//    - Fetches all splits associated with a specific user's Google ID, facilitating personal workout management.
// ```javascript
// router.get('/:googleId', async (req, res) => {
//     try {
//         const userSplits = await Split.find({ googleId: req.params.googleId });
//         res.json(userSplits);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 3. **POST Request - Create Split (/):**
//    - Handles the creation of new workout splits based on data submitted in the request body.
// ```javascript
// router.post('/', async (req, res) => {
//     const newSplit = new Split(req.body);
//     try {
//         await newSplit.save();
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 4. **PUT Request - Update Split (/put/:id):**
//    - Updates a specified split by ID, modifying its details as per the data in the request body.
// ```javascript
// router.put('/put/:id', async (req, res) => {
//     try {
//         await Split.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// ```

// 5. **DELETE Request - Delete Split (/delete/:id):**
//    - Removes a split from the database based on its ID.
// ```javascript
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         await Split.findByIdAndDelete(req.params.id);
//         res.redirect('back');
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// ```

// 6. **POST Request - Toggle Public Visibility of a Split (/public/:id):**
//    - Changes the visibility status of a workout split between public and private.
// ```javascript
// router.post('/public/:id', async (req, res) => {
//     const split = await Split.findById(req.params.id);
//     if (split.public === 'COPIED') return; // Ensure copied splits cannot change visibility
//     split.public = !split.public;
//     await split.save();
//     res.redirect('back');
// });

// 7. **POST Request - Clone Public Split (/public/:googleId/split/:id):**
//    - Clones a public split for a specified user, marking the new copy as "COPIED".
// ```javascript
// router.post('/public/:googleId/split/:id', async (req, res) => {
//     const originalSplit = await Split.findById(req.params.id);
//     const newSplit = new Split({
//         ...originalSplit.toObject(),
//         googleId: req.params.googleId,
//         public: 'COPIED'
//     });
//     await newSplit.save();
//     res.redirect('back');
// });
// ```

// **Exporting the Router:**
// The router is then exported to be used in the server setup, integrating it into the broader application ecosystem.
// ```javascript
// module.exports = router;
// ```

// This setup allows users to manage their workout splits efficiently, providing capabilities to create, read, update, delete, and share workout plans, enhancing the interactivity and functionality of your fitness application.


const express = require("express");

// Initialize the express router to define route endpoints:
const router = express.Router();

// Import the Split model that handles the database operations for split entities:
const Split = require("../../models/Split");

/*
HTTP Requests Overview:

1) POST = Create new entities or submit data.
    - POST is more secure than GET as it does not expose data in URL.

2) GET = Retrieve data.
    - GET is less secure; ideal for non-sensitive data retrieval as data is visible in URL.

3) PUT = Update existing entities.
    - PUT is idempotent, meaning multiple identical requests should have the same effect as a single request.

4) DELETE = Remove data.
    - DELETE removes data specified by the endpoint and parameters.
*/

// GET request to retrieve public splits:
router.get("/public", async (req, res) => {
    // Fetch splits where the 'public' property is set to 'true' and send them in the response:
    const splits = await Split.find({ public: "true" });
    res.send(splits);
});

// GET request to retrieve all splits for a specific user identified by googleId:
router.get("/:googleId", async (req, res) => {
    const splits = await Split.find({ googleId: req.params.googleId });
    res.send(splits);
});

// POST request to create a new split:
router.post("/", async (req, res) => {
    const result = await Split.create(req.body);
    // Redirect user back to the previous page after creation:
    res.redirect("back");
});

// PUT request to update an existing split:
router.post("/put/:id", async (req, res) => {
    await Split.findOneAndUpdate({ _id: req.params.id }, req.body);
    // Redirect to the previous page after updating:
    res.redirect("back");
});

// DELETE request to remove an existing split:
router.post("/delete/:id", async (req, res) => {
    await Split.findOneAndDelete({ _id: req.params.id });
    // Redirect to the previous page after deletion:
    res.redirect("back");
});

// POST request to toggle the 'public' status of a split:
router.post("/public/:id", async (req, res) => {
    const split = await Split.findOne({ _id: req.params.id });
    if (split.public === "COPIED") {
        // Prevent changing the status if the split is a copied version:
        res.redirect("back");
    } else if (split.public !== "true") {
        // Make the split public if it is not already:
        await Split.findOneAndUpdate({ _id: req.params.id }, { $set: { public: "true" }});
        res.redirect("back");
    } else {
        // Make the split private if it is currently public:
        await Split.findOneAndUpdate({ _id: req.params.id }, { $set: { public: "false" }});
        res.redirect("back");
    } 
});

// POST request to create a copy of a public split under a different user's ID:
router.post("/public/:googleId/split/:id", async (req, res) => {
    const originalSplit = await Split.findOne({ _id: req.params.id });
    const newSplit = new Split({
        googleId: req.params.googleId,
        name: originalSplit.name,
        workouts: originalSplit.workouts,
        notes: originalSplit.notes,
        public: "COPIED"
    });
    await Split.create(newSplit);
    // Redirect back after creating the new split:
    res.redirect("back");
});

module.exports = router;
