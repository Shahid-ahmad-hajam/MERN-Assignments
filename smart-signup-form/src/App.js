import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Email Validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Password Validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Invalid Email Format");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setMessage("Signup Successful!");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Smart Signup Form</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Signup</button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;