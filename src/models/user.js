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
    about : {
        type : String,
        default : "This is a default about."
    },

    gender : {
        type : String,
        enum: {
            values : ["male", "female", "others"],
            message : `{VALUE} is not a valid gender type`
        },
        // validate(value){
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("Invalid Gender")
        //     }
        // }
    },
    skills : {
        type : [String],
    },
    photoUrl : {
        type : String,
        default : "https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw"
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