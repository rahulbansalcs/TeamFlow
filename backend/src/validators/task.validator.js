import { body,validationResult } from "express-validator"
export const validateTask=[
body("projectId")
.trim()
.notEmpty()
.withMessage("Project ID is required")
.isUUID()
.withMessage("Project ID must be a valid UUID"),
body("title")
.trim()
.notEmpty()
.withMessage("Task title is required")
.isLength({max:200})
.withMessage("Task title cannot exceed 200 characters"),
body("description")
.optional({values:"falsy"})
.trim()
.isLength({max:2000})
.withMessage("Description cannot exceed 2000 characters"),
body("priority")
.optional({values:"falsy"})
.isIn(["low","medium","high"])
.withMessage("Priority must be low, medium, or high"),
body("status")
.optional({values:"falsy"})
.isIn(["todo","in_progress","completed"])
.withMessage("Status must be todo, in_progress, or completed"),
body("assignedTo")
.optional({values:"falsy"})
.isUUID()
.withMessage("Assigned user ID must be a valid UUID"),
(req,res,next)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
return res.status(400).json({
success:false,
errors:errors.array()
})
}
next()
}
]