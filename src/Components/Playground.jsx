import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { apiCall } from "../api/OpenAI";
import "../App.css";
//effects and animations
import TypingDots from "../Effects/TypingDots";
import TypewriterEffect from "../Effects/Typewriter";
import Welcome from "./Welcome";
import Swal from "sweetalert2";

const Playground = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: "en-IN",
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript.trim() !== "") {
      setInputMessage((prevInput) => prevInput + " " + transcript);
      resetTranscript();
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const currentMessages = [...messages];
      currentMessages.push({ text: inputMessage, sender: "user" });
      setMessages(currentMessages);
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
      setInputMessage("");
      // Call the API and handle the response
      await apiCall(inputMessage.trim())
        .then((res) => {
          if (res.success) {
            const responseText = res.text;
            const newMessages = [...currentMessages];
            newMessages.push({ text: responseText, sender: "assistant" });
            setMessages(newMessages);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handlePreviewImage = (imgUrl) => {
    Swal.fire({
      imageUrl: `${imgUrl}`,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: "Custom image",
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
    });
  };

  return (
    <div className="chat-container mt-5">
      <div className="chat-messages">
        {messages.length == 0 && <Welcome />}
        {messages.map((msg, index) => (
          <div
            data-aos={msg.sender === "user" && "fade-up"}
            key={index}
            className={
              msg.sender === "assistant" ? "messageFromAss" : "messageFromUser"
            }
          >
            {msg?.text?.includes("https://") ? (
              <img
                src={msg.text}
                alt="generated image"
                className="image-res"
                loading="lazy"
                onClick={() => handlePreviewImage(msg.text)}
              />
            ) : msg.sender == "assistant" ? (
              <TypewriterEffect contant={msg.text} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {isLoading && (
          <div className="loading-message messageFromAss" data-aos="fade-right">
            <p className="pt-1">
              <TypingDots />
            </p>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={isListening ? "Listening..." : "Type your message..."}
          className="message-input"
        />

        <button
          className="audio-button"
          title="Use Microphone"
          onClick={() => {
            isListening ? stopHandle() : handleListening();
          }}
        >
          <FaMicrophone color={isListening ? "Green" : "black"} />
        </button>
        <button
          title="Send Message"
          onClick={handleSendMessage}
          className="send-button"
          disabled={isLoading && true}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Playground;
