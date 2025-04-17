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

app.use("/student",studentRouter)

export {app}