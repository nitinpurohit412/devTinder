const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  let user = req.user;

  console.log("Sending a connection request.....");

  res.send(user.firstName + " : Sent the connection request");
});


module.exports = requestRouter  