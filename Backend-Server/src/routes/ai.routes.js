import {Router} from 'express'
import { Aihandle } from '../controllers/AiTesting.controller.js'
import { Ainvidia } from '../services/OpenAI/OpenAI.services.js'
const router = Router()
router.route('/api/test').post(Aihandle)
 
export default router