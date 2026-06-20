const express = require("express");

const app = express();

const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
});

// Books Route
app.get("/books", (req, res) => {
  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
    },
  ];

  res.json(books);
});

// Authors Route
app.get("/authors", (req, res) => {
  const authors = [
    {
      id: 1,
      name: "Paulo Coelho",
    },
    {
      id: 2,
      name: "James Clear",
    },
  ];

  res.json(authors);
});

// Book by ID Route
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;

  res.send(`Details of Book ID: ${bookId}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});