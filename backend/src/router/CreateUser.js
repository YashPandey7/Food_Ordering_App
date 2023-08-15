const express = require("express");
const router = new express.Router();
const User = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "eyJhbG#$%^JIUzI1#$%^InR5ccvshkpX";

router.post("/createuser", async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        const signup = new User({
            name : req.body.name,
            password : secPassword,
            email: req.body.email,
            location : req.body.location
        });

        const register = await signup.save();
        res.json({success: true});
    }catch(err){
        res.status(400).json({success: false});
    }
});


router.post("/loginuser", async(req, res) => {

    const email = req.body.email;
    try{
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({success: false});
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({success : false});
        }

        const data = {
            user:{
                id: userData.id
            }
        };
        
        const authToken = jwt.sign(data, jwtSecret);

        return res.status(200).json({success: true, authToken : authToken});


    }catch(err){
        res.status(404).json({success: false});
    }
});

module.exports = router;