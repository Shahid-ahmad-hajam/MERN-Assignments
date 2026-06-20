const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/Student");

const app = express();

app.use(express.json());

const PORT = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// CREATE
app.post("/students", async (req, res) => {
  const student = new Student(req.body);

  await student.save();

  res.send("Student Added Successfully");
});

// READ
app.get("/students", async (req, res) => {
  const students = await Student.find();

  res.json(students);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);

  res.send("Student Updated Successfully");
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);

  res.send("Student Deleted Successfully");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
