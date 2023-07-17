const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");

mongoDB();
app.get("/", (req,res) => {
    res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
    console.log(`Server is running at port : ${port}`);
}); 