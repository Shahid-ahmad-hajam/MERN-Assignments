const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");

const { verifyToken, isAdmin } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const SECRET_KEY = "mysecretkey";

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/roleDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.send("User Registered Successfully");
});


// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Invalid Password");
  }

  // Generate Token
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login Successful",
    token,
  });
});


// USER ROUTE
app.get("/user", verifyToken, (req, res) => {
  res.send("Welcome User");
});


// ADMIN ROUTE
app.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.send("Welcome Admin");
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});