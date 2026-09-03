const mongoose = require("mongoose")
const validtor = require("validator")


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    emailId :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validtor.isEmail(value)){
                throw new Error("Inavlid email address: " + value)
            }
        },
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validtor.isStrongPassword(value)){
                throw new Error("Put strong password : " + value)
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender")
            }
        }
    },
    skills : {
        type : [String],
    }
}, 
{
    timestamps : true,
})

module.exports = mongoose.model("User" , userSchema)