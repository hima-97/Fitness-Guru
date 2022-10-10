const express = require("express");
const router = express.Router();

const TrackedExercises = require("../../models/TrackedExercises");
const Repetitions = require("../../models/Repetitions");
const Weight = require("../../models/Weight");

// Get
router.get("/:repetitionsId", async (req, res) => {
    const weight = await Weight.find({ repetitions: req.params.repetitionsId });
    res.send(weight);
});

// Post
router.post("/", async (req, res) => {
    await Weight.create(req.body);
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

// Put
router.post("/put/:id", async (req, res) => {
    await Weight.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete
router.post("/delete/:id", async (req, res) => {
    await Weight.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

module.exports = router;
