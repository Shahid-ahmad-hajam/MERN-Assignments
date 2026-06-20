const express = require("express");

const app = express();

const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// About Route
app.get("/about", (req, res) => {
  res.send("This is the About Page");
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send("Contact us at hello@example.com");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});