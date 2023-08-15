const express = require("express");
const router = new express.Router();
const User = require("../models/Usermodel");
const {body, validationResult} = require("express-validator");

router.post("/createuser",
[body('email', "Incorrect Email").isEmail(),
body('name').isLength({min:3}),
body("password", "Incorrect Password").isLength({min : 5})]
,async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        await User.create({
            name : req.body.name,
            password : req.body.password,
            email: req.body.email,
            location : req.body.location
        });
        res.json({success: true});
    }catch(err){
        console.log(`Error in creating user: ${err}`);
        res.json({success: false});
    }
});


router.post("/login",
[body('email', "Incorrect Email").isEmail(),
body("password", "Incorrect Password").isLength({min : 5})],
 async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const userData = await User.findOne(req.body.email);
        if(!userData){
            return res.status(400).json({errors : "Invalid Credentials"});
        }

        if(req.body.password !== userData.password){
            return res.status(400).json({errors : "Invalid Credentials"});
        }
        
        return res.json({success: true});


    }catch(err){
        console.log(`Error in creating user: ${err}`);
        res.json({success: false});
    }
});

module.exports = router;