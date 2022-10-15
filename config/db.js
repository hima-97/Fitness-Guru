const mongoose = require("mongoose");

const connectDB = async () => 
{
    try 
    {
        // MongoDB database URI:
        const uri = process.env.MONGO_URI

        // Trying to establish connection with MongoDB database:
        const conn = await mongoose.connect(uri, {
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

module.exports = connectDB;
