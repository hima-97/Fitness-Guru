const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/user", require("./config/routes/user"));
app.use("/exercises", require("./config/routes/exercise"));
app.use("/workouts", require("./config/routes/workout"));
app.use("/splits", require("./config/routes/split"));
app.use("/trackedexercises", require("./config/routes/trackedExercises"));
app.use("/repetitions", require("./config/routes/repetitions"));
app.use("/weight", require("./config/routes/weight"));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
