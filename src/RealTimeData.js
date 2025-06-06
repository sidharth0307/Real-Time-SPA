// src/RealTimeData.js
import React, { useEffect, useState } from "react";

const RealTimeData = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>Real-Time Updates</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeData;
