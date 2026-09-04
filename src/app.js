const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bscrypt = require("bcrypt");
const user = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    //* Validation of password
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //* Encrypt the password

    const passwordHash = await bscrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req,res)=>{
  try {
    const {emailId, password} = req.body

    const user = await User.findOne({emailId : emailId})
    if(!user){
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bscrypt.compare(password , user.password)

    if(isPasswordValid){
      res.send("Login successful...")
    }
    else {
      throw new Error("Invalid Credentials")
    }


  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})


//*  Get User by email.
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//* Feed API - GET /feed  - get all the user from the databse
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//* Delete user from the databse
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User sucessfully deleted.");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//* Update the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(user);

    res.send("User successfully updated");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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
