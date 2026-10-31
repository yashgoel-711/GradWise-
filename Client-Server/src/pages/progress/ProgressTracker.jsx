import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Check, Loader2, RefreshCw, Sparkles, Plus } from "lucide-react";
import gradwiseService, { errorMessage } from "../../services/gradwise.service.js";
import ChatBot from "../../components/chatbot/ChatBot.jsx";

const ProgressTrackerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [regenerating, setRegenerating] = useState(false);

  const [role, setRole] = useState("");
  const [gap, setGap] = useState(null);
  const [gapLoading, setGapLoading] = useState(false);
  const [gapError, setGapError] = useState("");
  const [addedSkills, setAddedSkills] = useState([]);

  const applyRoadmap = (data) => {
    setTasks(data.roadmap || []);
    setDone(data.roadmapDone || []);
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      applyRoadmap(await gradwiseService.getRoadmap());
    } catch (err) {
      setError(errorMessage(err, "Could not load your roadmap."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (index) => {
    const previous = done;
    const next = previous.includes(index) ? previous.filter((i) => i !== index) : [...previous, index];
    setDone(next); // optimistic
    try {
      await gradwiseService.saveRoadmapProgress(next);
    } catch (err) {
      setDone(previous);
      toast.error(errorMessage(err, "Could not save your progress."));
    }
  };

  const regenerate = async () => {
    if (!window.confirm("Generate a new roadmap? Your ticked steps will be reset.")) return;
    setRegenerating(true);
    try {
      applyRoadmap(await gradwiseService.getRoadmap(true));
      toast.success("New roadmap generated");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setRegenerating(false);
    }
  };

  const findGap = async (e) => {
    e.preventDefault();
    if (!role.trim()) return;
    setGapLoading(true);
    setGapError("");
    setGap(null);
    setAddedSkills([]);
    try {
      setGap(await gradwiseService.getSkillGap(role.trim()));
    } catch (err) {
      setGapError(errorMessage(err));
    } finally {
      setGapLoading(false);
    }
  };

  const addSkill = async (name) => {
    try {
      const existing = await gradwiseService.getSkills();
      if (!existing.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
        await gradwiseService.saveSkills([...existing, { name, level: 30 }]);
      }
      setAddedSkills((prev) => [...prev, name]);
      toast.success(`${name} added to your skills`);
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const percent = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500" size={36} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">📌 Career Roadmap</h2>
          {tasks.length > 0 && (
            <button
              onClick={regenerate}
              disabled={regenerating}
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-3 py-2 rounded-lg text-sm"
            >
              {regenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {regenerating ? "Generating..." : "Regenerate with AI"}
            </button>
          )}
        </div>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center justify-between">
            <span>{error}</span>
            <button onClick={load} className="underline font-medium">
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No roadmap yet.</p>
            <button
              onClick={regenerate}
              disabled={regenerating}
              className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
            >
              {regenerating ? "Generating..." : "Generate my roadmap"}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>
                  {done.length} of {tasks.length} steps done
                </span>
                <span>{percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all" style={{ width: `${percent}%` }} />
              </div>
            </div>

            <ol className="relative border-l-2 border-gray-200 ml-3 space-y-4">
              {tasks.map((task, index) => {
                const isDone = done.includes(index);
                return (
                  <li key={index} className="ml-6">
                    <span
                      className={`absolute -left-[13px] flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                        isDone ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isDone ? <Check size={14} /> : index + 1}
                    </span>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggle(index)}
                        className="mt-1 accent-indigo-500"
                      />
                      <span className={`${isDone ? "line-through text-gray-400" : "text-gray-700"} text-base`}>{task}</span>
                    </label>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">Skill gap for a target role</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Tell us the role you want and the AI compares it with the skills on your profile.</p>

        <form onSubmit={findGap} className="flex gap-2">
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Backend Developer"
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={gapLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            {gapLoading ? "Analysing..." : "Find my gaps"}
          </button>
        </form>

        {gapError && <p className="text-red-500 mt-3 text-sm">{gapError}</p>}

        {gap && (
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Skills to learn for {gap.role}</h3>
              <div className="flex flex-wrap gap-2">
                {gap.missingSkills.map((skill) => {
                  const added = addedSkills.includes(skill);
                  return (
                    <span key={skill} className="flex items-center gap-2 pl-3 pr-1 py-1 bg-purple-50 text-purple-800 rounded-full text-sm">
                      {skill}
                      <button
                        onClick={() => addSkill(skill)}
                        disabled={added}
                        className="flex items-center gap-1 text-xs bg-purple-600 hover:bg-purple-700 disabled:bg-green-600 text-white px-2 py-0.5 rounded-full"
                      >
                        {added ? (
                          <>
                            <Check size={12} /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={12} /> Add to my skills
                          </>
                        )}
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            {gap.resources.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Where to learn</h3>
                <ul className="divide-y divide-gray-100">
                  {gap.resources.map((r, i) => (
                    <li key={i} className="py-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-gray-800">{r.title}</span>
                      <span className="text-gray-500">
                        {r.skill}
                        {r.platform && ` · ${r.platform}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatBot />
    </div>
  );
};

export default ProgressTrackerPage;
