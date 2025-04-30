import express from 'express';
import { verifyStudentJWT } from '../middlewares/auth.middleware.js';
import { createCourse, getCourse } from '../controllers/Course.controller.js';
// import { cre } from '../controllers/Project.controller.js';



const router = express.Router();


router.route('/create-course').post(verifyStudentJWT,createCourse);
router.route('/get-course').post(verifyStudentJWT, getCourse);


export default router;
