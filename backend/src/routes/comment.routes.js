import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {
createComment,
getComments,
deleteComment
} from "../controllers/comment.controller.js"
import { validateComment } from "../validators/comment.validator.js"
const router=Router()
router.post("/",authenticate,validateComment,createComment)
router.get("/task/:taskId",authenticate,getComments)
router.delete("/:id",authenticate,deleteComment)
export default router