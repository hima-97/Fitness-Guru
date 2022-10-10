const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: false,
    },
    heightFeet: {
        type: Number,
        required: false,
    },
    heightInches: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profilePic: {
        type: String,
        default: 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
    },
});

module.exports = mongoose.model("User", UserSchema);
