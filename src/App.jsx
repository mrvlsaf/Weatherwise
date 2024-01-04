import { useState } from "react";
import "./App.css";
import ErrorHandle from "./components/ErrorHandle/ErrorHandle";
import Home from "./components/Home/Home";

function App() {

  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleError = (err) => {
    let error = err.response.data.message;
    if (error) setMsg(error)
    else setMsg("Something went wrong")
    setOpen(true);
  };

  return (
    <>
      <Home
        handleError={handleError}
      />
      <ErrorHandle
        msg={msg}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default App;
