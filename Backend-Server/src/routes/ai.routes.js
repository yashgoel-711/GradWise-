import {Router} from 'express'
import { Aihandle } from '../controllers/AiTesting.controller.js'
import { Ainvidia } from '../services/OpenAI/OpenAI.services.js'
import { verifyStudentJWT } from '../middlewares/auth.middleware.js'
const router = Router()
router.route('/api/test').post(verifyStudentJWT,Aihandle)
 
export default router