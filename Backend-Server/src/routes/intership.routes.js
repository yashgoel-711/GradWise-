import express from 'express';
import { InternshipList } from '../controllers/internship.controller.js';
import { optionalStudentJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route: /internship/list (skill matching is added when the student is logged in)
router.post('/list', optionalStudentJWT, InternshipList);

export default router;
