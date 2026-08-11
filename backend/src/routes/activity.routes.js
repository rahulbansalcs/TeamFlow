import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {
createActivity,
getProjectActivitiesController,
getUserActivitiesController
} from "../controllers/activity.controller.js"
const router=Router()
router.post("/",authenticate,createActivity)
router.get("/project/:projectId",authenticate,getProjectActivitiesController)
router.get("/user",authenticate,getUserActivitiesController)
export default router