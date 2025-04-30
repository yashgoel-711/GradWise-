import {Router} from 'express'
import { registerStudent,loginStudent,logoutStudent, updateStudentSkills } from '../controllers/student.controllers.js'
import {upload} from '../middlewares/multer.middleware.js'
import {verifyStudentJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register-Student').post(upload.single("avatar"),registerStudent)
router.route('/login-Student').post(loginStudent)
router.route('/logout-Student').post(verifyStudentJWT , logoutStudent)
router.route('/skills-student').post(verifyStudentJWT,updateStudentSkills)





export default router 