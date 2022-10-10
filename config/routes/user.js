const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// Get
router.get("/:googleId", async (req, res) => {
    const user = await User.find({ googleId: req.params.googleId });
    res.send(user);
});

// Post
router.post("/", async (req, res) => {
    await User.create(req.body);
    res.redirect("back");
});

// Put
router.post("/put/:id", async (req, res) => {
    await User.findOneAndUpdate({ googleId: req.params.id }, req.body);
    res.redirect("back");
});

module.exports = router;
