import { Router } from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
    } from "../controllers/project.controller.js"
import { validateProject } from "../validators/project.validator.js"

const router=Router()
router.get("/:id",authenticate,getProject)
router.post("/",authenticate,validateProject,createProject)
router.get("/",authenticate,getProjects)
router.put("/:id",authenticate,validateProject,updateProject)
router.delete("/:id",authenticate,deleteProject)

export default router