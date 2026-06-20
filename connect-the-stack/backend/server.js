const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/fullstackDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Save User API
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  await user.save();

  res.send("User Saved Successfully");
});


// Get Users API
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});