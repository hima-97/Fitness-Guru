// "index.js" file AKA "server.js" file

const express = require("express");
const mongoose = require("mongoose"); // Mongoose will help us to connect to the MongoDB database
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// Loading configuration:
// This line allows us to have environment variables in the .env file
dotenv.config({ path: "./config/config.env" });

// Calling function to connect to MongoDB database:
// Note: function definition is in "config/db.js" file
connectDB();

// Creating Express server:
const app = express();

// Body parser:
// This is the cors middleware, which allows us to parse JSON when server is sending and receiving
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Port that the server will be on:
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app:
app.use(express.static(path.join(__dirname, "client/build")));

// Telling server to require and use the API endpoint routes for the different entities database schemas:
// Note: the API endpoint routes are in "config/routes" directory
// Now, whenever someone goes for example to the root URL and put "/user" (i.e. http://localhost:5000/user),
// then everything in "config/routes/user" will be loaded
app.use("/user", require("./config/routes/user"));
app.use("/exercises", require("./config/routes/exercise"));
app.use("/workouts", require("./config/routes/workout"));
app.use("/splits", require("./config/routes/split"));
app.use("/trackedexercises", require("./config/routes/trackedExercises"));
app.use("/repetitions", require("./config/routes/repetitions"));
app.use("/weight", require("./config/routes/weight")); //

// Anything that doesn't match the above, send back index.html:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Starting the server:
app.listen(PORT, console.log(`Server running on port ${PORT}`));
