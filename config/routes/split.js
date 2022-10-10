const express = require("express");
const router = express.Router();

const Split = require("../../models/Split");

// Get

router.get("/public", async (req, res) => {
    const splits = await Split.find({ public: "true" });
    res.send(splits);
});

router.get("/:googleId", async (req, res) => {
    const splits = await Split.find({ googleId: req.params.googleId });
    res.send(splits);
});

// Post
router.post("/", async (req, res) => {
    result = await Split.create(req.body);
    res.redirect("back");
});

// Put
router.post("/put/:id", async (req, res) => {
    await Split.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete
router.post("/delete/:id", async (req, res) => {
    await Split.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

router.post("/public/:id", async (req, res) => {
    const split = await Split.findOne({ _id: req.params.id })
    if(split.public === "COPIED"){
        res.redirect("back");
    }else if(split.public != "true"){
        await Split.findOneAndUpdate({ _id: req.params.id }, {
            $set:
            {
                public: "true"
            }
        });
        res.redirect("back");
    }else{
        await Split.findOneAndUpdate({ _id: req.params.id }, {
        $set:
        {
            public: "false"
        }
    });
    res.redirect("back");
    } 
});

router.post("/public/:googleId/split/:id", async (req, res) =>{
    const split = await Split.findOne({ _id: req.params.id })
    let newSplit = new Split
    newSplit.googleId = req.params.googleId
    newSplit.name = split.name
    newSplit.workouts = split.workouts
    newSplit.notes = split.notes
    newSplit.public = "COPIED"
    Split.create(newSplit)
    res.redirect("back")
})

module.exports = router;