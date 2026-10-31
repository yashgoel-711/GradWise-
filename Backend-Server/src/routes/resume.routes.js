import express from "express";
import { generateResume } from "../controllers/ResumeBuilder.controller.js";
import { verifyStudentJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Streams a PDF resume for the logged-in student (POST kept for older clients)
router.route("/resume").get(verifyStudentJWT, generateResume).post(verifyStudentJWT, generateResume);

export default router;
