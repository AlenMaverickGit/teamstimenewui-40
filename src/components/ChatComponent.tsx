import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChatComponent = () => {
  const location = useLocation();
  const documentChunks = location.state?.documentChunks ?? [];

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSendMessage = async () => {
    console.log("documentChunks:", documentChunks);
    // if (!query || documentChunks.length === 0) return;

    // setMessages((prev) => [...prev, `You: ${query}`]);
    // setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5221/api/gemini/ask",
        {
          documentChunks,
          question: query,
        }
      );

      setMessages((prev) => [...prev, `Gemini: ${response.data.answer}`]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, "Gemini: Something went wrong."]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-gray-100 p-4 h-96 overflow-auto mb-4 border rounded-md">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 text-sm">
              {msg}
            </div>
          ))}
          {isLoading && (
            <div className="text-gray-500 text-sm">Gemini is typing...</div>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Ask something..."
          className="border p-2 rounded-md flex-1"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !query}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
