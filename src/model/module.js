const mongoose = require("mongoose");
const addreshSchema = new mongoose.Schema({
    city: {
        type: String,
        trim: true
    },
    distik: {
        type: String,
        trim: true
    },
    pinCode: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    countery: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false,
    _id: false
});
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    addresh: addreshSchema,
    phoneNu: {
        type: Number,
        trim: true
    },
    time: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const User = mongoose.model("User", userSchema);
module.exports = { User };