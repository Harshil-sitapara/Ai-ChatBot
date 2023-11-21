import React from "react";
import Typewriter from "typewriter-effect";
import '../App.css'

export default function TypewriterEffect({contant}) {
    console.log("contant",contant)
  return (
    <>
      <Typewriter
        options={{
          strings: contant, 
          autoStart: true,
          loop: false, 
          delay: 50, 
          cursor: "▎",
          typeSpeed: 50, // typing speed in milliseconds (lower value = faster)
          deleteSpeed: 20, // deletion speed in milliseconds (lower value = faster)
        }}
        onInit={(typewriter) => {
          typewriter
            .callFunction(() => {
              console.log("String typed out!");
            })
            .start();
        }}
      />
    </>
  );
}
