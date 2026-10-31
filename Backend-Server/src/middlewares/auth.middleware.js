import {asyncAwaitHandler} from '../utils/asyncAwaitHandler.utils.js'
import jwt from 'jsonwebtoken'
import {Student} from '../models/Student.model.js'

import {apiError} from '../utils/apiError.utils.js'

 const verifyStudentJWT = asyncAwaitHandler(async (req, _ ,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new apiError(401,"unauthorized request")
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
        throw error instanceof apiError ? error : new apiError(401,"cannot verify tokens")
    }
})

// Sets req.student when a valid token is present, but never blocks the request
const optionalStudentJWT = async (req, _ ,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        if(token){
            const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
            req.student = await Student.findOne({_id : decodedToken._id})
        }
    } catch (error) {
        // anonymous request
    }
    next()
}


export {verifyStudentJWT, optionalStudentJWT }
