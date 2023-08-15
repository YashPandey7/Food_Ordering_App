const express = require("express");
const router = new express.Router();

router.post('/foodData', (req, res) => {
    try{
        // console.log(global.foodData2);
        // console.log(foodCategory);
        
        res.send([global.foodData2, global.foodCategory]);
    }catch(err){
        console.log(`Error ${err}`);
        res.send("Server Error");
    }
});

module.exports=router;