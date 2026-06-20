import { createRoot } from "react-dom/client";
import {useState,useEffect} from "react"
function App() {
  const [count,setCount]=useState(0)
  useEffect(()=>{
    setTimeout(()=>{
      setCount(count+1)
    },1000)
  },[count])

  return (
    <>
      <p>{count}</p>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
