import { Student } from "../models/Student.model.js";
import { Project } from "../models/Project.model.js";
import { Course } from "../models/Course.model.js";
import { Academic } from "../models/Academic.model.js";
import { Certification } from "../models/Certification.model.js";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";

const GRADE_POINTS = { O: 10, "A+": 10, A: 9, "B+": 8, B: 7, C: 6, D: 5, F: 0 };

const round2 = (n) => Math.round(n * 100) / 100;

const publicStudent = (student) => {
  const { password, ...rest } = student.toObject();
  return rest;
};

// Weighted by credits; returns null when there is nothing to average
const computeSgpa = (subjects) => {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  if (!totalCredits) return { sgpa: null, totalCredits: 0 };
  const points = subjects.reduce((sum, s) => sum + (GRADE_POINTS[s.grade] ?? 0) * s.credits, 0);
  return { sgpa: round2(points / totalCredits), totalCredits };
};

const computeCgpa = (semesters) => {
  const valid = semesters.filter((s) => s.sgpa != null && s.totalCredits);
  const credits = valid.reduce((sum, s) => sum + s.totalCredits, 0);
  if (!credits) return null;
  return round2(valid.reduce((sum, s) => sum + s.sgpa * s.totalCredits, 0) / credits);
};

// ---------- profile + skills ----------

const getMe = asyncAwaitHandler(async (req, res) => {
  return res.status(200).json(new apiResponse(200, publicStudent(req.student), "Profile fetched"));
});

// Accepts ["React", ...] or [{name, level}, ...]
const normalizeSkills = (input) => {
  if (!Array.isArray(input)) return null;
  const seen = new Set();
  const out = [];
  for (const item of input) {
    const name = (typeof item === "string" ? item : item?.name)?.trim();
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    const level = typeof item === "object" ? Number(item.level) : 50;
    out.push({ name, level: Number.isFinite(level) ? Math.min(100, Math.max(0, level)) : 50 });
  }
  return out;
};

// Older students only have `skills` (names); give them a default level
const skillDetailsOf = (student) =>
  student.skillDetails?.length
    ? student.skillDetails.map(({ name, level }) => ({ name, level }))
    : (student.skills || []).map((name) => ({ name, level: 50 }));

const getSkills = asyncAwaitHandler(async (req, res) => {
  return res.status(200).json(new apiResponse(200, skillDetailsOf(req.student), "Skills fetched"));
});

const saveSkills = asyncAwaitHandler(async (req, res) => {
  const skills = normalizeSkills(Array.isArray(req.body) ? req.body : req.body?.skills);
  if (!skills) throw new apiError(400, "Skills must be an array");

  req.student.skillDetails = skills;
  req.student.skills = skills.map((s) => s.name);
  await req.student.save();

  return res.status(200).json(new apiResponse(200, skills, "Skills updated"));
});

// ---------- academics ----------

const getAcademics = asyncAwaitHandler(async (req, res) => {
  const semesters = await Academic.find({ uploadedBy: req.student._id }).sort({ semester: 1 });
  return res
    .status(200)
    .json(new apiResponse(200, { semesters, cgpa: computeCgpa(semesters) }, "Academics fetched"));
});

const addAcademic = asyncAwaitHandler(async (req, res) => {
  const { semester, subjects } = req.body;
  const sem = Number(semester);
  if (!Number.isInteger(sem) || sem < 1 || sem > 12) {
    throw new apiError(400, "Semester must be a number between 1 and 12");
  }
  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new apiError(400, "Add at least one subject");
  }

  const cleaned = subjects.map((s) => ({
    name: String(s?.name ?? "").trim(),
    grade: String(s?.grade ?? "").trim().toUpperCase(),
    credits: Number(s?.credits),
  }));
  const bad = cleaned.find(
    (s) => !s.name || !(s.grade in GRADE_POINTS) || !Number.isFinite(s.credits) || s.credits <= 0
  );
  if (bad) {
    throw new apiError(400, "Each subject needs a name, a grade (O, A+, A, B+, B, C, D, F) and credits");
  }

  const { sgpa, totalCredits } = computeSgpa(cleaned);
  // One record per semester: re-adding a semester replaces it
  const record = await Academic.findOneAndUpdate(
    { uploadedBy: req.student._id, semester: sem },
    { semester: sem, subjects: cleaned, sgpa, totalCredits, uploadedBy: req.student._id },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return res.status(201).json(new apiResponse(201, record, "Semester saved"));
});

const deleteAcademic = asyncAwaitHandler(async (req, res) => {
  const removed = await Academic.findOneAndDelete({ _id: req.params.id, uploadedBy: req.student._id });
  if (!removed) throw new apiError(404, "Semester not found");
  return res.status(200).json(new apiResponse(200, {}, "Semester deleted"));
});

// ---------- certifications ----------

const getCertifications = asyncAwaitHandler(async (req, res) => {
  const items = await Certification.find({ uploadedBy: req.student._id }).sort({ issueDate: -1, createdAt: -1 });
  return res.status(200).json(new apiResponse(200, items, "Certifications fetched"));
});

const addCertification = asyncAwaitHandler(async (req, res) => {
  const { title, issuer, issueDate, credentialUrl } = req.body;
  if (!title?.trim() || !issuer?.trim()) {
    throw new apiError(400, "Title and issuer are required");
  }
  const created = await Certification.create({
    title: title.trim(),
    issuer: issuer.trim(),
    issueDate: issueDate || undefined,
    credentialUrl: credentialUrl?.trim() || undefined,
    uploadedBy: req.student._id,
  });
  return res.status(201).json(new apiResponse(201, created, "Certification added"));
});

const deleteCertification = asyncAwaitHandler(async (req, res) => {
  const removed = await Certification.findOneAndDelete({ _id: req.params.id, uploadedBy: req.student._id });
  if (!removed) throw new apiError(404, "Certification not found");
  return res.status(200).json(new apiResponse(200, {}, "Certification deleted"));
});

// ---------- roadmap progress ----------

const saveRoadmapProgress = asyncAwaitHandler(async (req, res) => {
  const { done } = req.body;
  if (!Array.isArray(done)) throw new apiError(400, "done must be an array of step indexes");

  const total = req.student.Roadmap.length;
  const indexes = [...new Set(done.map(Number))].filter((i) => Number.isInteger(i) && i >= 0 && i < total);
  req.student.roadmapDone = indexes;
  await req.student.save();

  return res.status(200).json(new apiResponse(200, { roadmapDone: indexes }, "Progress saved"));
});

// ---------- dashboard ----------

const getDashboard = asyncAwaitHandler(async (req, res) => {
  const student = req.student;
  const uploadedBy = student._id;

  const [projects, courses, certifications, semesters] = await Promise.all([
    Project.find({ uploadedBy }).sort({ createdAt: -1 }),
    Course.find({ uploadedBy }).sort({ createdAt: -1 }),
    Certification.find({ uploadedBy }).sort({ createdAt: -1 }),
    Academic.find({ uploadedBy }).sort({ semester: 1 }),
  ]);

  const skills = skillDetailsOf(student);
  const roadmap = student.Roadmap || [];
  const done = new Set(student.roadmapDone || []);
  const repoName = (url) => url.replace(/\/+$/, "").split("/").slice(-2).join("/");

  const activity = [
    ...projects.map((p) => ({ type: "project", text: `Added project ${repoName(p.githubRepo)}`, at: p.createdAt })),
    ...certifications.map((c) => ({ type: "certification", text: `Earned ${c.title} (${c.issuer})`, at: c.createdAt })),
    ...courses.map((c) => ({ type: "course", text: `Saved course ${c.title}`, at: c.createdAt })),
    ...semesters.map((s) => ({
      type: "academic",
      text: `Recorded Semester ${s.semester}${s.sgpa != null ? ` (SGPA ${s.sgpa})` : ""}`,
      at: s.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 6);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        student: { name: student.name, college: student.college, branch: student.branch, year: student.year, avatar: student.avatar },
        stats: {
          cgpa: computeCgpa(semesters),
          skills: skills.length,
          projects: projects.length,
          certifications: certifications.length,
          courses: courses.length,
          roadmapPercent: roadmap.length ? Math.round((done.size / roadmap.length) * 100) : 0,
        },
        gpaSeries: semesters.filter((s) => s.sgpa != null).map((s) => ({ semester: `Sem ${s.semester}`, sgpa: s.sgpa })),
        topSkills: [...skills].sort((a, b) => b.level - a.level).slice(0, 6),
        roadmap: {
          total: roadmap.length,
          done: done.size,
          next: roadmap.map((text, index) => ({ text, index })).filter((s) => !done.has(s.index)).slice(0, 3),
        },
        activity,
      },
      "Dashboard fetched"
    )
  );
});

export {
  getMe,
  getSkills,
  saveSkills,
  getAcademics,
  addAcademic,
  deleteAcademic,
  getCertifications,
  addCertification,
  deleteCertification,
  saveRoadmapProgress,
  getDashboard,
  computeCgpa,
  skillDetailsOf,
};
