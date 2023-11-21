import React from "react";
import "../App.css";
import TypewriterEffect from "../Effects/Typewriter";

export default function Welcome() {
  return (
    <div className="welcome-container" data-aos="fade-up">
        <img  src="https://cdn-icons-png.flaticon.com/512/3988/3988126.png?ga=GA1.1.1931642287.1700301844" alt="Logo"  />
      <p>
        <TypewriterEffect contant={"How can I help you today?"} />
      </p>
    </div>
  );
}
