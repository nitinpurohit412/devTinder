const express = require("express");

const app = express()

app.use("/hello", (req, res) =>{
    res.send("Hello")
});

app.use("/test", (req, res) =>{
    res.send("Namaste test")
});

app.use("/", (req, res) =>{
    res.send("hello hello hello !!!")
});

app.listen(7777, ()=>{
    console.log("server is successfully listen on port 7777")
});