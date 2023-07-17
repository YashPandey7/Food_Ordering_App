const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://yash:abcd@cluster0.m5hbke0.mongodb.net/";

const mongoDB = async() => {
await mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB Connected')})
.catch((err) => {
    console.error(`Error connecting to MongoDB ${err}`)
});
};

module.exports = mongoDB;