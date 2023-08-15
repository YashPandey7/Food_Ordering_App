const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        minlength : 3,
        trim : true
    },
    location : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 3
    },
    date : {
        type : Date,
        default : Date.now
    },
});

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;