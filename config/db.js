// This file contains the code that connects to the MongoDB database and sets up any necessary configurations. 
// It may export a function that connects to the database and exports the models of the application, allowing them to be imported and used in other parts of the application.

// This code exports a single function, "connectDB", that is responsible for connecting to a MongoDB database using Mongoose.

// This line of code imports the Mongoose library, which allows you to interact with MongoDB databases in Node.js:
const mongoose = require("mongoose");

// The connectDB function is defined as an async function, which means that it can use the await keyword to wait for asynchronous operations to complete:
const connectDB = async () => 
{
    try 
    {
        // MongoDB database URI:
        const uri = process.env.MONGO_URI

        // Trying to establish connection with MongoDB database by calling the "mongoose.connect()" function, passing in the connection string and an options object:
        const conn = await mongoose.connect(uri, {
            // The options object specifies that the new URL parser and unified topology should be used:
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB database connection established successfully: ${conn.connection.host}`);
    } catch (err) 
    {
        console.log(err);
        process.exit(1);
    }
};

// The connectDB function is exported so that it can be imported and used in other parts of the application:
module.exports = connectDB;
