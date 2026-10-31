import express from 'express';
import { verifyStudentJWT } from '../middlewares/auth.middleware.js';
import { createCourse, getCourse, listCourses, deleteCourse } from '../controllers/Course.controller.js';



const router = express.Router();


router.route('/create-course').post(verifyStudentJWT,createCourse);
router.route('/get-course').post(verifyStudentJWT, getCourse);

router.route('/').get(verifyStudentJWT, listCourses).post(verifyStudentJWT, createCourse);
router.route('/:id').delete(verifyStudentJWT, deleteCourse);


export default router;
