// Adding API endpoint route for "Weight" schema, so the server can be used to perform the CRUD (create, read, update, delete) operations

const express = require("express");

// We need the Express router because this is a route that we are creating:
const router = express.Router();

// Requiring the mongoose model for the "Tracked Exercise" schema:
const TrackedExercises = require("../../models/TrackedExercises");

// Requiring the mongoose model for the "Repetitions" schema:
const Repetitions = require("../../models/Repetitions");

// Requiring the mongoose model for the "Weight" schema:
const Weight = require("../../models/Weight");

/*
HTTP Requests:

1) POST = create
    - POST is a little safer than GET because the parameters are not stored in browser history or in web server logs

2) GET = read
    - GET is less secure compared to POST because data sent is part of the URL
    - Never use GET when sending passwords or other sensitive information

3) PUT = update/replace
    - POST requests supply additional data from the client (browser) to the server in the message body. In contrast, GET requests include all required data in the URL
    - The difference between POST and PUT is that PUT requests are idempotent. That is, calling the same PUT request multiple times will always produce the same result

4) DELETE = delete
*/

// Get request:
router.get("/:repetitionsId", async (req, res) => {
    // Assigning weight with the specified repetitionsId in the URL from MongoDB Atlas to "weight" variable:
    const weight = await Weight.find({ repetitions: req.params.repetitionsId });
    res.send(weight);
});

// Post request:
router.post("/", async (req, res) => {
    await Weight.create(req.body);

    // The res.redirect() is a URL utility function which helps to redirect the web pages according to the specified paths
    // The method res.redirect("back") is used to redirect the user back to the http referer (i.e. back to page where request came from)
    // The http referer contains an absolute or partial address of the page that makes the request
    // If no http referer is present, the request is redirected to “/” route by default
    res.redirect("back");
});

router.post("/log/:name", async (req, res) => {
    let trackedExercise = await TrackedExercises.findOne({ name: req.params.name, googleId: req.body.googleId })
    if(trackedExercise === null){
        const newTrackedExercise = new TrackedExercises
        newTrackedExercise.googleId = req.body.googleId
        newTrackedExercise.name = req.params.name
        trackedExercise = await TrackedExercises.create(newTrackedExercise)
    }
    let repetition = await Repetitions.findOne({ weights: trackedExercise._id, repetitions: req.body.Repetitions })
    if(repetition === null){
        const newRepetition = new Repetitions
        newRepetition.weights = trackedExercise._id
        newRepetition.repetitions = req.body.Repetitions
        repetition = await Repetitions.create(newRepetition)
    }
    const weight = new Weight
    weight.repetitions = repetition._id
    weight.weight = req.body.Weight
    weight.date = req.body.date
    await Weight.create(weight)
    res.redirect("back");
})

// Put request:
router.post("/put/:id", async (req, res) => {
    await Weight.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete request:
router.post("/delete/:id", async (req, res) => {
    await Weight.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

module.exports = router;
