const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
    },
    userMessage:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model("user",userSchema);
