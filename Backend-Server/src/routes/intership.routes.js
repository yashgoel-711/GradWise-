import express from 'express';
import { InternshipList } from '../controllers/internship.controller.js';

const router = express.Router();

// Route: /internships/list
router.post('/list', InternshipList);

export default router;
