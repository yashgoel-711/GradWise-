import {asyncAwaitHandler} from '../utils/asyncAwaitHandler.utils.js'
import jwt from 'jsonwebtoken'
import {Student} from '../models/Student.model.js'

import {apiError} from '../utils/apiError.utils.js'

 const verifyStudentJWT = asyncAwaitHandler(async (req, _ ,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new apiError(400,"unauthorized request")
    }

    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
    
    let student = await Student.findOne({_id : decodedToken._id})

    if(!student){
        throw new apiError(401,"Expired Access Token")
    }

    req.student = student;
    next()
    } catch (error) {
        console.log(error)
        throw new apiError(500,"cannot verify tokens")
    }
})


export {verifyStudentJWT }
