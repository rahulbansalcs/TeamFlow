import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {
getUsers,
getMyProfile,
updateMyProfile
} from "../controllers/user.controller.js"
const router=Router()
router.get("/",authenticate,getUsers)
router.get("/me",authenticate,getMyProfile)
router.put("/me",authenticate,updateMyProfile)
export default router