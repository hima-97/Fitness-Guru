// "index.js" file for server
// This code is the main entry point of the server-side of the application, it sets up the express server, connects to the database, sets up routing and middlewares, and starts the server

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
// The body parser middleware is used to parse incoming JSON requests and make it available on the request object
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

// This is a catch-all route that sends back the React's index.html file whenever the requested route doesn't match any of the routes defined above:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Starting the server:
// The server is then started by calling the listen method on the express app, passing in the PORT and a callback function to log the message "Server running on port {PORT}" in the console
app.listen(PORT, console.log(`Server running on port ${PORT}`));
