import {Router} from 'express'
import { registerStudent,loginStudent,logoutStudent } from '../controllers/student.controllers.js'
import {
    getMe, getSkills, saveSkills,
    getAcademics, addAcademic, deleteAcademic,
    getCertifications, addCertification, deleteCertification,
    saveRoadmapProgress, getDashboard
} from '../controllers/profile.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import {verifyStudentJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register-Student').post(upload.single("avatar"),registerStudent)
router.route('/login-Student').post(loginStudent)
router.route('/logout-Student').post(verifyStudentJWT , logoutStudent)

router.route('/me').get(verifyStudentJWT, getMe)
router.route('/dashboard').get(verifyStudentJWT, getDashboard)

router.route('/skills-student')
    .get(verifyStudentJWT, getSkills)
    .post(verifyStudentJWT, saveSkills)

router.route('/academics')
    .get(verifyStudentJWT, getAcademics)
    .post(verifyStudentJWT, addAcademic)
router.route('/academics/:id').delete(verifyStudentJWT, deleteAcademic)

router.route('/certifications')
    .get(verifyStudentJWT, getCertifications)
    .post(verifyStudentJWT, addCertification)
router.route('/certifications/:id').delete(verifyStudentJWT, deleteCertification)

router.route('/roadmap/progress').put(verifyStudentJWT, saveRoadmapProgress)

export default router
