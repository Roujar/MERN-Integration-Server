const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },  
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
});

module.exports = mongoose.model("userdetail", userDetailSchema);
