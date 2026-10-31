import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// CORS_ORIGIN can hold several comma-separated origins. When one of them is localhost,
// any localhost/127.0.0.1 port is allowed too (Vite moves to 5174 if 5173 is busy).
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").map((o) => o.trim().replace(/\/$/, "")).filter(Boolean)
const allowLocalPorts = allowedOrigins.some((o) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))

app.use(cors({
    origin : (origin, callback) => {
        const ok = !origin ||
            allowedOrigins.includes(origin) ||
            (allowLocalPorts && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
        callback(null, ok ? origin : false)
    },
    credentials : true
}))
app.use(express.static("public"))
app.use(express.json({limit:"50kb"}))
app.use(express.urlencoded({extended:true , limit:"50kb"}))
app.use(cookieParser())


import studentRouter from "./routes/student.routes.js"
import aiRouter from "./routes/ai.routes.js"
import eventRouter from "./routes/events.routes.js"
import internshipRouter from "./routes/intership.routes.js"
import resumeRoutes from "./routes/resume.routes.js";
import courseRouter from "./routes/course.routes.js"
import projectRouter from "./routes/project.routes.js"
app.use("/student",studentRouter)
app.use('/ai',aiRouter)
app.use('/events',eventRouter)
app.use('/internship',internshipRouter)
app.use("/api", resumeRoutes);
app.use("/student/projects",projectRouter)
app.use("/student/course",courseRouter)

export {app}