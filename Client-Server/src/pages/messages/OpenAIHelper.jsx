import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { openAiService } from "../../services/openAi.services.js"; // Adjust path if needed
import ReactMarkdown from "react-markdown";
const suggestionService = new openAiService();

const OpenAIHelper = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const prompt = input;
    // Earlier successful turns, sent as context (errors are excluded)
    const history = messages
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setLoading(true);
    setInput("");

    try {
      const res = await suggestionService.AiMessage({ prompt, history });

      // Extract just the actual AI message
      const aiContent = res?.data?.data || "No response received.";

      const aiMessage = { role: "ai", content: aiContent };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const reason =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `⚠️ ${reason}`, error: true }
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
             <ReactMarkdown>{msg.content}</ReactMarkdown>
            
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
