const express = require("express");
const router = express.Router();

const Workout = require("../../models/Workout");

router.get("/:googleId", async (req, res) => {
    const workouts = await Workout.find({ googleId: req.params.googleId });
    res.send(workouts);
});

router.get("/:googleId/:id", async (req, res) => {
  const workouts = await Workout.find({ googleId: req.params.googleId, _id: req.params.id });
  res.send(workouts);
});

// Post
router.post("/", async (req, res) => {
    result = await Workout.create(req.body);
    res.send(result);
});

// Put
router.post('/put/:id', async (req,res) => {
  await Workout.findOneAndUpdate({_id: req.params.id}, req.body)
  res.redirect('back')
})

// Delete
router.post('/delete/:id', async (req,res) => {
  await Workout.findOneAndDelete({_id: req.params.id})
  res.redirect('back')
})

module.exports = router;