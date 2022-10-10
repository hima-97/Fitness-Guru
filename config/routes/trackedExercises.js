const express = require("express");
const router = express.Router();

const TrackedExercises = require("../../models/TrackedExercises");

// Get
router.get("/:googleId", async (req, res) => {
    const trackedExercises = await TrackedExercises.find({ googleId: req.params.googleId });
    res.send(trackedExercises);
});

// Post
router.post("/", async (req, res) => {
    await TrackedExercises.create(req.body);
    res.redirect("back");
});

// Put
router.post("/put/:id", async (req, res) => {
    await TrackedExercises.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete
router.post("/delete/:id", async (req, res) => {
    await TrackedExercises.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

module.exports = router;
