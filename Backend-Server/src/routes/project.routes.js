import express from 'express';
import { verifyStudentJWT } from '../middlewares/auth.middleware.js';
import { createProject, getProject } from '../controllers/Project.controller.js';


const router = express.Router();


router.route('/create-project').post(verifyStudentJWT,createProject);
router.route('/get-project').post(verifyStudentJWT, getProject);


export default router;
