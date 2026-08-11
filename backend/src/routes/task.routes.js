import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import { validateTask } from "../validators/task.validator.js"
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    updateStatus,
    assignTask,
    downloadTaskAttachment,
    removeTask
} from "../controllers/task.controller.js"
import upload from "../middlewares/upload.middleware.js"
import { uploadTaskAttachment } from "../controllers/task.controller.js"
const router=Router()
router.get("/:id/attachment",authenticate,downloadTaskAttachment)
router.post("/:id/attachment",authenticate,upload.single("file"),uploadTaskAttachment)
router.post("/",authenticate,validateTask,createTask)
router.get("/project/:projectId",authenticate,getTasks)
router.get("/:id",authenticate,getTask)
router.put("/:id",authenticate,updateTask)
router.patch("/:id/status",authenticate,updateStatus)
router.patch(
    "/:id/assign",
    authenticate,
    assignTask
    )
router.delete("/:id",authenticate,removeTask)

export default router