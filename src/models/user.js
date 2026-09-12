const mongoose = require("mongoose")
const validtor = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$789", {
            expiresIn: "7d",
          });

          return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
const user = this;
const passwordHash = user.password  

const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
);
    return isPasswordValid
}

module.exports = mongoose.model("User" , userSchema)