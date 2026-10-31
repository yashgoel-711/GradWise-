import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Download, ExternalLink, Loader2, Pencil, Plus, Trash2, Award } from "lucide-react";
import gradwiseService, { errorMessage } from "../../services/gradwise.service.js";
import ChatBot from "../../components/chatbot/ChatBot.jsx";

const STATUSES = ["Incomplete", "In Progress", "Completed"];
const STATUS_STYLE = {
  Completed: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Incomplete: "bg-red-100 text-red-800",
};

const EMPTY_FORM = { githubRepo: "", status: "In Progress", summary: "", domain: "", techStack: "" };

const repoName = (url) => url.replace(/^https?:\/\//, "").replace(/\/+$/, "").split("/").slice(-2).join("/");

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [p, c] = await Promise.all([gradwiseService.getProjects(), gradwiseService.getCertifications()]);
      setProjects(p);
      setCertifications(c);
    } catch (err) {
      setError(errorMessage(err, "Could not load your portfolio."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await gradwiseService.downloadResume();
    } catch (err) {
      toast.error(errorMessage(err, "Could not generate the resume."));
    } finally {
      setDownloading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditingId(project._id);
    setForm({
      githubRepo: project.githubRepo || "",
      status: project.status || "In Progress",
      summary: project.summary || "",
      domain: project.domain || "",
      techStack: (project.techStack || []).join(", "),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      githubRepo: form.githubRepo.trim(),
      status: form.status,
      summary: form.summary.trim(),
      domain: form.domain.trim(),
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (!payload.githubRepo || !payload.summary || !payload.domain || !payload.techStack.length) {
      toast.error("Fill in every field, including at least one technology.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const updated = await gradwiseService.updateProject(editingId, payload);
        setProjects((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
        toast.success("Project updated");
      } else {
        const created = await gradwiseService.addProject(payload);
        setProjects((prev) => [created, ...prev]);
        toast.success("Project added");
      }
      closeForm();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete ${repoName(project.githubRepo)}?`)) return;
    try {
      await gradwiseService.deleteProject(project._id);
      setProjects((prev) => prev.filter((p) => p._id !== project._id));
      toast.success("Project deleted");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const inputClass =
    "block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Portfolio</h1>
          <p className="text-gray-500 text-sm">Projects and certifications that go into your resume.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreate}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} /> Add Project
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
          >
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {downloading ? "Writing resume..." : "Download AI Resume"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">{editingId ? "Edit project" : "Add a project"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub repository URL</label>
              <input
                name="githubRepo"
                value={form.githubRepo}
                onChange={handleChange}
                placeholder="https://github.com/you/project"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
              <input
                name="domain"
                value={form.domain}
                onChange={handleChange}
                placeholder="Web, AI, Backend..."
                className={inputClass}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech stack (comma separated)</label>
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className={inputClass}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={3}
                placeholder="What does it do?"
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
            >
              {saving ? "Saving..." : editingId ? "Save changes" : "Add project"}
            </button>
            <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center justify-between">
          <span>{error}</span>
          <button onClick={load} className="underline font-medium">
            Retry
          </button>
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Projects</h2>
            {projects.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                No projects yet. Add your first project to show it here and in your resume.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-lg text-indigo-700 hover:underline break-all"
                      >
                        {repoName(project.githubRepo)} <ExternalLink size={14} />
                      </a>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${
                          STATUS_STYLE[project.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    {project.domain && <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">{project.domain}</p>}
                    <p className="text-gray-600 text-sm mt-3 flex-grow">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(project.techStack || []).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100 text-sm">
                      <button onClick={() => openEdit(project)} className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(project)} className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
              <Link to="/GradWise/certifications" className="text-sm text-indigo-600 hover:underline">
                Manage certifications
              </Link>
            </div>
            {certifications.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                No certifications yet.{" "}
                <Link to="/GradWise/certifications" className="text-indigo-600 hover:underline">
                  Add one
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <Link
                    to="/GradWise/certifications"
                    key={cert._id}
                    className="bg-white rounded-xl shadow p-4 flex items-start gap-3 hover:shadow-md transition"
                  >
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{cert.title}</p>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <ChatBot />
    </div>
  );
};

export default Portfolio;
