import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";

export const generateResume = asyncAwaitHandler(async (req, res) => {
  const student = req.student;
  console.log(student)

  if (!student) {
    throw new apiError(400, "Student data is required in request");
  }

  // Create the directory if it doesn't exist
  const resumeDir = path.join("public", "resumes");
  fs.mkdirSync(resumeDir, { recursive: true });

  const filename = `${student.name.split(" ").join("_")}_Resume.pdf`;
  const filePath = path.join(resumeDir, filename);

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Title
  doc.fontSize(24).text(student.name, { underline: true });
  doc.moveDown();

  // Basic Info
  doc.fontSize(14).text(`Email: ${student.email}`);
  doc.text(`Contact: ${student.contact}`);
  doc.text(`College: ${student.college}`);
  doc.text(`Branch: ${student.branch}`);
  doc.text(`Year of Graduation: ${student.year}`);
  doc.moveDown();

  // Skills
  doc.fontSize(16).text("Skills:", { underline: true });
  if (student.skills && student.skills.length > 0) {
    doc.fontSize(12).text(student.skills.join(", "));
  } else {
    doc.fontSize(12).text("No skills listed.");
  }

  // Optional Domain
  if (student.domain) {
    doc.moveDown();
    doc.fontSize(16).text("Preferred Domain:", { underline: true });
    doc.fontSize(12).text(student.domain);
  }

  doc.end();

  writeStream.on("finish", () => {
    res.status(200).json({
      success: true,
      message: "Resume generated successfully",
      downloadLink: `/resumes/${filename}`,
    });
  });

  writeStream.on("error", (err) => {
    console.error("PDF generation failed:", err);
    throw new apiError(500, "Failed to generate resume PDF");
  });
});
