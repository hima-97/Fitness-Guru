// Adding API endpoint route for "Repetitions" schema, so the server can be used to perform the CRUD (create, read, update, delete) operations for the "Repetitions" schema in the MongoDB database
//This code exports an Express router that handles the CRUD (create, read, update, delete) operations for the "Repetitions" schema in the MongoDB database.


const express = require("express");

// We need the Express router because this is a route that we are creating:
const router = express.Router();

// Requiring the mongoose model for the "Repetitions" schema:
const Repetitions = require("../../models/Repetitions");

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
router.get("/:weightsId", async (req, res) => {
    // Assigning repetitions with the specified weightsId in the URL from MongoDB Atlas to "repetitions" variable:
    const repetitions = await Repetitions.find({ weights: req.params.weightsId });
    res.send(repetitions);
});

// Post request:
router.post("/", async (req, res) => {
    let repetitions = await Repetitions.find({ repetitions: req.body.repetitions, weights: req.body.weights })
    console.log(repetitions)
    if(Object.keys(repetitions).length === 0){
        await Repetitions.create(req.body);
    }
    
    // The res.redirect() is a URL utility function which helps to redirect the web pages according to the specified paths
    // The method res.redirect("back") is used to redirect the user back to the http referer (i.e. back to page where request came from)
    // The http referer contains an absolute or partial address of the page that makes the request
    // If no http referer is present, the request is redirected to “/” route by default
    res.redirect("back");
});

// Put request:
router.post("/put/:id", async (req, res) => {
    await Repetitions.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect("back");
});

// Delete request:
router.post("/delete/:id", async (req, res) => {
    await Repetitions.findOneAndDelete({ _id: req.params.id });
    res.redirect("back");
});

module.exports = router;
