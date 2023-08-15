const express = require("express");
const router = new express.Router();
const User = require("../models/Usermodel");

router.post("/createuser", async(req, res) => {
    try{
        const signup = new User({
            name : req.body.name,
            password : req.body.password,
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

        if(req.body.password !== userData.password){
            return res.status(400).json({success : false});
        }
        
        return res.status(200).json({success: true});


    }catch(err){
        res.status(404).json({success: false});
    }
});

module.exports = router;