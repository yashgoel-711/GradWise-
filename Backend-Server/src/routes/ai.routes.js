import {Router} from 'express'
import { Aihandle,AiProgressTracker,SkillGap } from '../controllers/AiTesting.controller.js'
import { verifyStudentJWT } from '../middlewares/auth.middleware.js'

const router = Router()


router.route('/api/test').post(verifyStudentJWT,Aihandle)
router.route('/api/test2').post(verifyStudentJWT,AiProgressTracker)
router.route('/api/skill-gap').post(verifyStudentJWT,SkillGap)
 
export default router
