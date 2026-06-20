import React, { useState } from "react";

function App() {
  const [mood, setMood] = useState("");

  const handleMood = (selectedMood) => {
    setMood(selectedMood);
  };

  // Dynamic background color
  const getBackgroundColor = () => {
    switch (mood) {
      case "Happy":
        return "lightgreen";
      case "Sad":
        return "lightblue";
      case "Excited":
        return "yellow";
      case "Angry":
        return "salmon";
      default:
        return "white";
    }
  };

  // Dynamic message
  const getMessage = () => {
    switch (mood) {
      case "Happy":
        return "You are feeling great!";
      case "Sad":
        return "Hope things get better!";
      case "Excited":
        return "That's awesome!";
      case "Angry":
        return "Take a deep breath!";
      default:
        return "Select your mood";
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: getBackgroundColor(), //get backGround Color
        height: "100vh",
        paddingTop: "50px",
        border: "1px solid black",
      }}
    >
      <h1>Mood Tracker</h1>

      {/* Buttons */}
      <button onClick={() => handleMood("Happy")}>😊 Happy</button>
      <button onClick={() => handleMood("Sad")}>😢 Sad</button>
      <button onClick={() => handleMood("Excited")}>🤩 Excited</button>
      <button onClick={() => handleMood("Angry")}>😡 Angry</button>

      {/* Output */}
      <h2>Your Mood: {mood}</h2>
      <h3>{getMessage()}</h3>
    </div>
  );
}

export default App;
