const express = require("express");

const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)


app.get("/user/login", (req, res)=>{
    res.send("User logined")
})

app.get("/user", userAuth, (req, res)=>{
    res.send("User data sent")
})

app.get("/admin/getAlldata", (req, res)=>{
    res.send("All data Sent")
})

app.get("/admin/deleteUser", (req, res)=>{
    res.send("Deleted user")
})


app.listen(7777, () => {
  console.log("server is successfully listen on port 7777");
});
