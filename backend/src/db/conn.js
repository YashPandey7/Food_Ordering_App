const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/fooditem");
        console.log('Connected to MongoDB');

        const fetched_data = mongoose.connection.db.collection("foodData2");
        fetched_data.find({}).toArray()
        .then((data) => { 
            global.foodData2 = data;
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
        })

        const fetched_data2 = mongoose.connection.db.collection("foodCategory");
        fetched_data2.find({}).toArray()
        .then((data) => { 
            global.foodCategory = data;
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
        })

    }catch(err){
        console.log(`Failed to connect ${err}`);
    }
};

connectDB();