const express = require("express");

const app = express()

app.get("/user", (req, res)=>{
    res.send({ firstName : "Nitin", lastName : "Purohit"})
})

app.post("/user", (req, res)=>{
    //saving data to DB
    res.send("Data successfully saved to the Database")
})

app.delete("/user", (req, res)=>{
    res.send("Deleted successfully")
})

app.use("/test", (req, res) =>{
    res.send("Namaste test")
});

// app.use("/", (req, res) =>{
//     res.send("hello hello hello !!!")
// });

app.listen(7777, ()=>{
    console.log("server is successfully listen on port 7777")
});