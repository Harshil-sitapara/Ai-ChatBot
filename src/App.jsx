import React, { useEffect } from "react";
import "./App.css";
import Playground from "./Components/Playground";
import Swal from "sweetalert2";
import AOS from 'aos'
import 'aos/dist/aos.css';

const App = () => {
  const handleDisplay = () => {
    Swal.fire({
      title:
        "Welcome!</br> Feel free to ask me anything and explore the features.",
      width: 700,
      padding: "3em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      confirmButtonText: "Let's get started!",
      allowOutsideClick: false,
    });
    localStorage.setItem("welComePrompt", "true");
  };
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      {!localStorage.getItem("welComePrompt") && handleDisplay()}
      <div className="main">
        {/* <h3 className="text-center heading">AI Assistant</h3> */}
        <Playground />
      </div>
    </>
  );
};
export default App;
