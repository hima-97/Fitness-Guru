const express = require("express");
const router = express.Router();

const Exercise = require("../../models/Exercise");

// Get
router.get("/:googleId", async (req, res) => {
    const exercises = await Exercise.find({ googleId: req.params.googleId });
    res.send(exercises);
});

// Post
router.post("/", async (req, res) => {
    await Exercise.create(req.body);
    res.redirect("back");
});

// Put
router.post("/put/:id", async (req, res) => {
    await Exercise.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete
router.post("/delete/:id", async (req, res) => {
    await Exercise.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

module.exports = router;
