// Adding API endpoint route for "Split" schema, so the server can be used to perform the CRUD (create, read, update, delete) operations

const express = require("express");

// We need the Express router because this is a route that we are creating:
const router = express.Router();

// Requiring the mongoose model for the "Split" schema:
const Split = require("../../models/Split");

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
router.get("/public", async (req, res) => {
    const splits = await Split.find({ public: "true" });
    res.send(splits);
});

// Get request:
router.get("/:googleId", async (req, res) => {
    // Assigning split with the specified googleId in the URL from MongoDB Atlas to "splits" variable:
    const splits = await Split.find({ googleId: req.params.googleId });
    res.send(splits);
});

// Post request:
router.post("/", async (req, res) => {
    result = await Split.create(req.body);

    // The res.redirect() is a URL utility function which helps to redirect the web pages according to the specified paths
    // The method res.redirect("back") is used to redirect the user back to the http referer (i.e. back to page where request came from)
    // The http referer contains an absolute or partial address of the page that makes the request
    // If no http referer is present, the request is redirected to “/” route by default
    res.redirect("back");
});

// Put request:
router.post("/put/:id", async (req, res) => {
    await Split.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete request:
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