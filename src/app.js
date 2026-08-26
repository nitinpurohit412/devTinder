const express = require("express");

const app = express();

app.get("/getUser", (req, res)=>{

    throw new Error("fgsgv")
    res.send("User data Sent")
})

app.use("/" , (err, req, res, next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
    
})

app.listen(7777, () => {
  console.log("server is successfully listen on port 7777");
});
