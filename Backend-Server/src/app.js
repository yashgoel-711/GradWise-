import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.static("public"))
app.use(express.json({limit:"50kb"}))
app.use(express.urlencoded({extended:true , limit:"50kb"}))
app.use(cookieParser())


import studentRouter from "./routes/student.routes.js"
import aiRouter from "./routes/ai.routes.js"
import eventRouter from "./routes/events.routes.js"

app.use("/student",studentRouter)
app.use('/ai',aiRouter)
app.use('/events',eventRouter)

export {app}