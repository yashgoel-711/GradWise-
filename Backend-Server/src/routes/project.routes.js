import express from 'express';
import { verifyStudentJWT } from '../middlewares/auth.middleware.js';
import { createProject, getProject, listProjects, updateProject, deleteProject } from '../controllers/Project.controller.js';


const router = express.Router();


router.route('/create-project').post(verifyStudentJWT,createProject);
router.route('/get-project').post(verifyStudentJWT, getProject);

router.route('/').get(verifyStudentJWT, listProjects).post(verifyStudentJWT, createProject);
router.route('/:id').put(verifyStudentJWT, updateProject).delete(verifyStudentJWT, deleteProject);


export default router;
