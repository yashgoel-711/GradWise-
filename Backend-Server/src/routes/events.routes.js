import {Router} from 'express'
import EventsList from '../controllers/events.controller.js'
const router = Router()
router.route('/hackathons').post(EventsList)



export default router 