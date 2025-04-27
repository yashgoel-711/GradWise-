import React, { useState } from "react";
import { openAiService } from "../../services/openAi.services.js"; // Adjust path if needed
import ReactMarkdown from "react-markdown";
const suggestionService = new openAiService();

const Courses = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(""); // store string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuggestions("");

    try {
      const prompt = `Suggest learning resources for: ${query}. Include free courses, websites, books, or videos if possible.`;
      const response = await suggestionService.AiMessage({ prompt });

      if (response?.data.success) {
        setSuggestions(response.data.data); // ✅ Get ONLY data field from object
      } else {
        setError(response?.message || "Failed to get suggestions.");
      }
    } catch (err) {
      console.error("Error getting suggestions:", err);
      setError("Failed to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold mb-2">AI Learning Resource Suggestion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a topic (e.g., machine learning, web dev)"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <img
          src="../../../public/Chatbot.png"
          alt="Chatbot"
          className="fixed bottom-6 right-6 w-30 h-30 cursor-pointer hover:scale-105 transition-transform z-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Fetching..." : "Get Suggestions"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {suggestions && (
        <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap prose prose-blue max-w-none">
          <h3 className="font-semibold mb-4">Suggestions:</h3>
          <ReactMarkdown>{suggestions}</ReactMarkdown> {/* ✅ Render formatted markdown! */}
        </div>
      )}
    </div>
  );
};

export default Courses;
