// The repetitions.js file in your project's server directory provides an Express router setup designed to manage CRUD operations for the "Repetitions" model in your MongoDB database. This model likely tracks details of exercise repetitions linked to specific workouts or weights. Here’s an in-depth breakdown of how this router is structured and functions:

// **Importing Dependencies:**
// - **express**: The core framework for handling HTTP requests and routing.
// - **Repetitions model**: The Mongoose model for the repetitions schema, facilitating interactions with the repetitions collection in the database.

// ```javascript
// const express = require('express');
// const Repetitions = require('../models/Repetitions');
// const router = express.Router();
// ```

// **Router Setup:**
// An instance of an Express router is created to manage routes specific to repetitions data, enabling CRUD functionalities.

// **Route Handlers:**
// 1. **GET Request - Fetch Repetitions (/weightsId):**
//    - Retrieves all repetitions associated with a specific weight ID, demonstrating data linkage within your application.
//    - Uses Mongoose's `find` method to perform a filtered search in the database based on the `weightsId`.
// ```javascript
// router.get('/:weightsId', async (req, res) => {
//     try {
//         const repetitions = await Repetitions.find({ weightsId: req.params.weightsId });
//         res.json(repetitions);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
// ```

// 2. **POST Request - Add Repetition (/):**
//    - Handles the creation of a new repetition entry.
//    - Checks for existing entries to prevent duplicates and uses Mongoose’s `create` method to add new data.
// ```javascript
// router.post('/', async (req, res) => {
//     try {
//         const newRepetition = new Repetitions(req.body);
//         await newRepetition.save();
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
// ```

// 3. **PUT Request - Update Repetition (/put/:id):**
//    - Updates an existing repetition entry identified by the ID in the URL.
//    - Modifies the entry using data provided in the request body.
// ```javascript
// router.put('/put/:id', async (req, res) => {
//     try {
//         await Repetitions.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('back');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
// ```

// 4. **DELETE Request - Delete Repetition (/delete/:id):**
//    - Removes a repetition entry based on its ID, effectively managing data cleanup.
// ```javascript
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         await Repetitions.findByIdAndDelete(req.params.id);
//         res.redirect('back');
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
// ```

// **Redirect Behavior:**
// - Redirects the user to the previous page (`res.redirect('back')`) after POST, PUT, and DELETE operations. This enhances user experience by providing seamless navigation and immediate feedback after data operations.

// **Exporting the Router:**
// - The configured router is exported to be included and used in the server setup, integrating it with other API routes.
// ```javascript
// module.exports = router;
// ```

// This file ensures robust data management and provides essential API endpoints for the Repetitions model, supporting dynamic web interactions and precise data handling within your application.



// Importing the Express library to facilitate the creation of an HTTP server
const express = require("express");

// Creating a new Router object from Express to handle routing of HTTP requests
const router = express.Router();

// Importing the Mongoose model for the "Repetitions" schema to interact with the database
const Repetitions = require("../../models/Repetitions");

/*
HTTP Requests overview:
1) POST = create
   - More secure than GET as data is not exposed in URL or browser history.
2) GET = read
   - Retrieves data; less secure for sensitive data as parameters are in URL.
3) PUT = update/replace
   - Idempotent; multiple identical requests should have the same effect as a single one.
4) DELETE = delete
   - Removes data.
*/

// Handles GET requests on "/:weightsId", fetching repetitions associated with a given weightsId
router.get("/:weightsId", async (req, res) => {
    // Using Mongoose to find all repetition documents that match the provided weightsId
    const repetitions = await Repetitions.find({ weights: req.params.weightsId });
    // Sending the found repetitions back to the client
    res.send(repetitions);
});

// Handles POST requests to create a new repetition entry
router.post("/", async (req, res) => {
    // First, checking if a repetition with the same properties already exists to avoid duplicates
    let repetitions = await Repetitions.find({ repetitions: req.body.repetitions, weights: req.body.weights });
    console.log(repetitions); // Logging for debugging
    if(Object.keys(repetitions).length === 0){
        // If no existing match is found, create a new repetition entry with the provided body data
        await Repetitions.create(req.body);
    }
    
    // Redirect the user back to the previous page, enhancing user experience by not leaving them on a JSON page
    res.redirect("back");
});

// Handles PUT requests to update an existing repetition entry by its ID
router.post("/put/:id", async (req, res) => {
    // Updating the document in the database that matches the provided ID with the new data in the request body
    await Repetitions.findOneAndUpdate({ _id: req.params.id }, req.body);
    // Redirecting back to the previous page to maintain context for the user
    res.redirect("back");
});

// Handles DELETE requests to remove an existing repetition entry by its ID
router.post("/delete/:id", async (req, res) => {
    // Deleting the document from the database that matches the provided ID
    await Repetitions.findOneAndDelete({ _id: req.params.id });
    // Redirecting back to the previous page after the operation
    res.redirect("back");
});

// Exporting the router module to be used in other parts of the application
module.exports = router;
