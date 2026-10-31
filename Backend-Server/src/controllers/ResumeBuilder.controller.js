import PDFDocument from "pdfkit";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { Project } from "../models/Project.model.js";
import { Academic } from "../models/Academic.model.js";
import { Certification } from "../models/Certification.model.js";
import { Ainvidia } from "../services/OpenAI/OpenAI.services.js";
import { computeCgpa, skillDetailsOf } from "./profile.controller.js";

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "");

// Plain-text professional summary from the student's own data. Falls back to a template when the AI is unavailable.
const buildSummary = async (student, skills, projects, certifications) => {
  const fallback =
    `${student.branch} student at ${student.college} (year ${student.year})` +
    (skills.length ? ` with skills in ${skills.slice(0, 5).join(", ")}.` : ".");
  try {
    const text = await Ainvidia(
      `Write a 3 sentence professional resume summary in first person, no headings, no markdown, for this student.
Name: ${student.name}. Branch: ${student.branch}. College: ${student.college}. Year: ${student.year}.
Skills: ${skills.join(", ") || "not listed"}.
Projects: ${projects.map((p) => p.summary || p.githubRepo).join("; ") || "none"}.
Certifications: ${certifications.map((c) => c.title).join(", ") || "none"}.
Output only the summary text.`
    );
    return text.replace(/[*#_`]/g, "").trim() || fallback;
  } catch (error) {
    console.error("Resume summary fell back to template:", error.message);
    return fallback;
  }
};

export const generateResume = asyncAwaitHandler(async (req, res) => {
  const student = req.student;
  if (!student) {
    throw new apiError(400, "Student data is required in request");
  }

  const uploadedBy = student._id;
  const [projects, certifications, semesters] = await Promise.all([
    Project.find({ uploadedBy }).sort({ createdAt: -1 }),
    Certification.find({ uploadedBy }).sort({ issueDate: -1 }),
    Academic.find({ uploadedBy }).sort({ semester: 1 }),
  ]);
  const skills = skillDetailsOf(student).map((s) => s.name);
  const cgpa = computeCgpa(semesters);
  const summary = await buildSummary(student, skills, projects, certifications);

  const filename = `${student.name.split(" ").join("_")}_Resume.pdf`;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  const heading = (text) => {
    doc.moveDown(0.8).fontSize(13).fillColor("#4338ca").text(text.toUpperCase());
    const y = doc.y + 2;
    doc.moveTo(50, y).lineTo(545, y).strokeColor("#c7d2fe").stroke();
    doc.moveDown(0.4).fillColor("#111827").fontSize(11);
  };

  doc.fontSize(24).fillColor("#111827").text(student.name);
  doc.fontSize(11).fillColor("#4b5563").text(`${student.email}  |  ${student.contact}`);
  doc.text(`${student.branch}, ${student.college}  |  Year ${student.year}${cgpa != null ? `  |  CGPA ${cgpa}` : ""}`);

  heading("Summary");
  doc.text(summary);

  heading("Skills");
  doc.text(skills.length ? skills.join("  •  ") : "No skills listed.");

  if (projects.length) {
    heading("Projects");
    projects.forEach((p) => {
      doc.font("Helvetica-Bold").text(p.githubRepo.replace(/^https?:\/\//, ""));
      doc.font("Helvetica");
      if (p.techStack?.length) doc.fillColor("#4b5563").text(`Tech: ${p.techStack.join(", ")}`).fillColor("#111827");
      if (p.summary) doc.text(p.summary);
      doc.moveDown(0.4);
    });
  }

  if (certifications.length) {
    heading("Certifications");
    certifications.forEach((c) => {
      doc.text(`${c.title} - ${c.issuer}${c.issueDate ? ` (${fmtDate(c.issueDate)})` : ""}`);
    });
  }

  if (semesters.length) {
    heading("Academics");
    semesters.forEach((s) => {
      doc.text(`Semester ${s.semester}: SGPA ${s.sgpa ?? "-"}`);
    });
  }

  doc.end();
});
