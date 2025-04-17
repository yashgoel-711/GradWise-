import {Router} from 'express'
import { Aihandle } from '../controllers/AiTesting.controller'
const router = Router()
router.route('/api/test').post(Aihandle)
 
export default router