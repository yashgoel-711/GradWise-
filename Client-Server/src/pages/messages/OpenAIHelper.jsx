import React, { useState } from "react";
import axios from "axios";
import { Sparkles, Send } from "lucide-react";

import { openAiService } from "../../services/openAi.services.js"; // Adjust path if needed

const suggestionService = new openAiService();
const OpenAIHelper = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      console.log(input)

      const res = await suggestionService.AiDataRoadmap({prompt:input})
      setResponse(res.data || "No response received.");
    } catch (err) {
      setResponse("Something went wrong. Please try again.");
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

      {loading ? (
        <p className="text-sm text-gray-500 italic">Thinking...</p>
      ) : (
        response && (
          <div className="p-3 bg-gray-100 border rounded-md text-gray-800 whitespace-pre-line">
            {response}
          </div>
        )
      )}
    </div>
  );
};

export default OpenAIHelper;
