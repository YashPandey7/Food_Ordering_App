const express = require("express");
const app = express();
const port = 5000;
require("./src/db/conn");
const router1 = require("./src/router/CreateUser");
const router2 = require("./src/router/DisplayData");
const router3 = require("./src/router/OrderData");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next(); 
})
app.use(express.json());

app.use('/api/', router1);
app.use('/api/', router2);
app.use('/api/', router3);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});