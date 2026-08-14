import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import memberRoutes from "./routes/member.routes.js"
import commentRoutes from "./routes/comment.routes.js"
import activityRoutes from "./routes/activity.routes.js"
import errorMiddleware from "./middlewares/error.middleware.js"

const app=express()

const limiter=rateLimit({
windowMs:15*60*1000,
max:100,
standardHeaders:true,
legacyHeaders:false
})

app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL||"https://teamflow-1-8gfc.onrender.com",
    credentials:true
    }))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(limiter)

app.get("/api/health",(req,res)=>{
res.status(200).json({
success:true,
message:"TeamFlow API is running"
})
})
app.use("/api/activities",activityRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/members",memberRoutes)

app.use("/api/tasks",taskRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/projects",memberRoutes)
app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "TeamFlow API is up and running!"
    });
  });
app.use((req,res)=>{
    res.status(404).json({
    success:false,
    message:"Route not found"
    })
    })
    app.use(errorMiddleware)




export default app
