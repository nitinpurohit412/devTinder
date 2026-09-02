const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");

app.use(express.json())

app.post("/signup", async (req, res) => {

  const user = new User(req.body)

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//*  Get User by email.
app.get("/user", async(req, res)=>{
  const userEmail = req.body.emailId

 try{
  const users = await User.find({emailId : userEmail})
  if(users.length === 0) {
    res.status(404).send("User not found")
  } else{
    res.send(users)
  }
 }  catch (err){
  res.status(400).send("Something went wrong")
 }
})


//* Feed API - GET /feed  - get all the user from the databse
app.get("/feed" , async (req, res)=>{
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
     res.status(400).send("Something went wrong")
  }
})

//* Delete user from the databse
app.delete("/user" , async (req, res) =>{
 const userId = req.body.userId
  try {
    const user = await User.findByIdAndDelete(userId)
    res.send("User sucessfully deleted.")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})


//* Update the user 
app.patch("/user" , async (req ,res) =>{
  const userId = req.body.userId
  const data = req.body
  try {
    const user = await User.findByIdAndUpdate(userId, data)
    console.log(user)
    res.send("User successfully updated")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("server is successfully listen on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...");
  });
