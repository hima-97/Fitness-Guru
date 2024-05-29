// The index.js file in the root directory serves as the main entry point for the server-side of your application. This file sets up the Express server, connects to the MongoDB database, configures middleware, sets up routing, and starts the server. Below is a detailed breakdown of its components and their roles:

// **index.js - Main Entry Point for the Server**

// **Detailed Explanation:**
// - **Imports and Configuration:**
//   - Imports necessary modules like express, mongoose, bodyParser, cors, and path.
//   - Loads environment variables using dotenv for configuration settings like database URI and port number.

// - **App and Middleware Setup:**
//   - Initializes an Express app instance.
//   - Configures middleware for JSON body parsing (bodyParser.json()) and Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

// - **Database Connection:**
//   - Connects to the MongoDB database using Mongoose, with connection parameters for the new URL parser and unified topology. Logs a success message upon successful connection and catches any connection errors.

// - **Routing:**
//   - Imports and sets up route handlers for various API endpoints, including exercises, repetitions, splits, tracked exercises, users, weights, and workouts. These routes handle CRUD operations for their respective models.

// - **Static Assets for Production:**
//   - Serves static files from the client build folder if the application is running in a production environment. This is essential for deploying a full-stack application with a client-side build.

// - **Server Initialization:**


const express = require("express"); // Importing Express to create the server
const mongoose = require("mongoose"); // Importing Mongoose to connect to the MongoDB database
const dotenv = require("dotenv"); // Importing dotenv to manage environment variables
const connectDB = require("./config/db"); // Importing the function to connect to the database
const path = require("path"); // Importing path to handle and transform file paths

// Loading configuration:
// This allows us to use environment variables defined in the .env file
dotenv.config({ path: "./config/config.env" });

// Connecting to MongoDB database:
// This calls the connectDB function which is defined in the "config/db.js" file
connectDB();

// Creating an Express server:
const app = express();

// Body parser middleware:
// This middleware parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));
// This middleware parses incoming requests with JSON payloads
app.use(express.json());

// Defining the port on which the server will run:
// It uses the port specified in the environment variable or defaults to 5000
const PORT = process.env.PORT || 5000;

// Serving static files from the React frontend app:
// This serves all the static files from the "client/build" directory
app.use(express.static(path.join(__dirname, "client/build")));

// Setting up API endpoint routes for different entities:
// These routes handle requests to specific paths and are defined in the "config/routes" directory
// For example, requests to http://localhost:5000/user will be handled by the routes defined in "config/routes/user"
app.use("/user", require("./config/routes/user"));
app.use("/exercises", require("./config/routes/exercise"));
app.use("/workouts", require("./config/routes/workout"));
app.use("/splits", require("./config/routes/split"));
app.use("/trackedexercises", require("./config/routes/trackedExercises"));
app.use("/repetitions", require("./config/routes/repetitions"));
app.use("/weight", require("./config/routes/weight"));

// Catch-all route to handle any other requests:
// This sends back the React app's index.html file if none of the above routes match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Starting the server:
// The server is started by calling the listen method on the express app
// It listens on the specified port and logs a message to the console when it starts
app.listen(PORT, console.log(`Server running on port ${PORT}`));
