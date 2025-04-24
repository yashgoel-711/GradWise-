import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { openAiService } from "../../services/openAi.services.js"; // Adjust path if needed

const suggestionService = new openAiService();

const OpenAIHelper = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");
  
    try {
      const res = await suggestionService.AiMessage({ prompt: input });
  
      // Extract just the actual AI message
      const aiContent = res?.data?.data || "No response received.";
  
      const aiMessage = { role: "ai", content: aiContent };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white shadow rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-800">Ask AI Mentor</h2>
      </div>
      <img
      onClick={()=>{Navigate("/GradWise/OpenAI-Help")}}
    src="../../../public/Chatbot.png"
    alt="Chatbot"
    className="fixed bottom-6 right-6 w-30 h-30 cursor-pointer hover:scale-105 transition-transform z-50"
  />

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Suggest a resource to learn system design"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
        >
          <Send size={18} />
          Ask
        </button>
      </form>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg whitespace-pre-line text-sm ${
              msg.role === "user"
                ? "bg-purple-100 text-right ml-auto max-w-[80%]"
                : "bg-gray-100 text-left mr-auto max-w-[80%]"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-gray-500 italic">Thinking...</p>
        )}
      </div>
    </div>
  );
};

export default OpenAIHelper;
