import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {
addProjectMember,
getMembers,
removeProjectMember
} from "../controllers/member.controller.js"

const router=Router()

router.post("/",authenticate,addProjectMember)

router.get(
"/project/:projectId",
authenticate,
getMembers
)

router.delete(
"/:projectId/:userId",
authenticate,
removeProjectMember
)

export default router