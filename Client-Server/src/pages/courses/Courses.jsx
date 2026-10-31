import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { openAiService } from "../../services/openAi.services.js";
import gradwiseService, { errorMessage } from "../../services/gradwise.service.js";
import ReactMarkdown from "react-markdown";
import ChatBot from "../../components/chatbot/ChatBot.jsx"

const suggestionService = new openAiService();

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const DIFFICULTY_STYLE = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};
const EMPTY_FORM = { courseLink: "", title: "", platform: "", difficulty: "Beginner", duration: "", summary: "", tags: "" };

const Courses = () => {
  // My courses
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // AI suggestions
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(""); // store string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    setCoursesLoading(true);
    setCoursesError("");
    try {
      setCourses(await gradwiseService.getCourses());
    } catch (err) {
      setCoursesError(errorMessage(err, "Could not load your courses."));
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = {
      courseLink: form.courseLink.trim(),
      title: form.title.trim(),
      platform: form.platform.trim(),
      difficulty: form.difficulty,
      duration: form.duration.trim(),
      summary: form.summary.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (!payload.courseLink || !payload.title || !payload.platform || !payload.tags.length) {
      toast.error("Link, title, platform and at least one tag are required.");
      return;
    }
    setSaving(true);
    try {
      const created = await gradwiseService.addCourse(payload);
      setCourses((prev) => [created, ...prev]);
      setForm(EMPTY_FORM);
      setShowForm(false);
      toast.success("Course added");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Remove "${course.title}"?`)) return;
    try {
      await gradwiseService.deleteCourse(course._id);
      setCourses((prev) => prev.filter((c) => c._id !== course._id));
      toast.success("Course removed");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

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
      setError(errorMessage(err, "Failed to fetch suggestions. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} /> {showForm ? "Close" : "Add course"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Course title" className={inputClass} required />
            <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform (Coursera, Udemy...)" className={inputClass} required />
            <input name="courseLink" value={form.courseLink} onChange={handleChange} placeholder="Course link" className={`${inputClass} md:col-span-2`} required />
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className={inputClass}>
              {DIFFICULTIES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 6 weeks)" className={inputClass} />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags, comma separated" className={`${inputClass} md:col-span-2`} required />
            <textarea name="summary" value={form.summary} onChange={handleChange} rows={2} placeholder="Short summary" className={`${inputClass} md:col-span-2`} />
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
              >
                {saving ? "Saving..." : "Save course"}
              </button>
            </div>
          </form>
        )}

        {coursesLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-indigo-500" size={28} />
          </div>
        ) : coursesError ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center justify-between">
            <span>{coursesError}</span>
            <button onClick={loadCourses} className="underline font-medium">
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No courses saved yet. Add one above to track what you are learning.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course._id} className="border border-gray-200 rounded-lg p-4 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={course.courseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-indigo-700 hover:underline"
                  >
                    {course.title} <ExternalLink size={14} />
                  </a>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${DIFFICULTY_STYLE[course.difficulty] || "bg-gray-100 text-gray-800"}`}>
                    {course.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {course.platform}
                  {course.duration && ` · ${course.duration}`}
                </p>
                {course.summary && <p className="text-sm text-gray-600 mt-2 flex-grow">{course.summary}</p>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {(course.tags || []).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(course)}
                  className="self-start flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 mt-3"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-white shadow rounded-xl space-y-4">
        <h2 className="text-2xl font-bold mb-2">AI Learning Resource Suggestion</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a topic (e.g., machine learning, web dev)"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-60 transition"
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

      <ChatBot />
    </div>
  );
};

export default Courses;
