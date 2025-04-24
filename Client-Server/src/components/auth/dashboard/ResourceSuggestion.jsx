import React, { useState } from "react";
import { openAiService } from "../../../services/openAi.services"; // Adjust path if needed

const suggestionService = new openAiService();

const ResourceSuggestion = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuggestions("");

    try {
      const prompt = `Suggest learning resources for: ${query}. Include free courses, websites, books, or videos if possible.`;
      const response = await suggestionService.AiData({ prompt });

      const result = response?.data || "No suggestions found.";
      setSuggestions(result);
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
        <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap">
          <h3 className="font-semibold mb-2">Suggestions:</h3>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default ResourceSuggestion;
