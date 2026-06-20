const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const SECRET_KEY = "mysecretkey";

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();

  res.send("User Registered Successfully");
});


// LOGIN ROUTE
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send("User Not Found");
  }

  // Compare Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Invalid Password");
  }

  // Generate JWT
  const token = jwt.sign(
    { email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login Successful",
    token,
  });
});


// Protected Route
app.get("/profile", (req, res) => {
  res.send("Protected Profile Route");
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});