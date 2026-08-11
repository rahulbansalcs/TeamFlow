import { body,validationResult } from "express-validator"
export const validateComment=[
body("taskId")
.trim()
.notEmpty()
.withMessage("Task ID is required")
.isUUID()
.withMessage("Task ID must be a valid UUID"),
body("comment")
.trim()
.notEmpty()
.withMessage("Comment is required")
.isLength({max:2000})
.withMessage("Comment cannot exceed 2000 characters"),
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