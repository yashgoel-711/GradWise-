import express from "express";
// import { generateResume } from "../controllers/resume.controller.js";
import { generateResume } from "../controllers/ResumeBuilder.controller.js";
// import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
// import { generateResumePDF} from "../controllers/ResumeBuilder.controller.js";
import { verifyStudentJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

// @route   GET /api/resume/:studentId
// @desc    Generate PDF resume for a student
// @access  Public or Protected (depending on your setup)
router.route("/resume").post(verifyStudentJWT,generateResume);

export default router;
