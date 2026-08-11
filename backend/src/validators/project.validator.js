import { body,validationResult } from "express-validator"
export const validateProject=[
body("title")
.trim()
.notEmpty()
.withMessage("Project title is required")
.isLength({max:200})
.withMessage("Project title cannot exceed 200 characters"),
body("description")
.optional({values:"falsy"})
.trim()
.isLength({max:2000})
.withMessage("Project description cannot exceed 2000 characters"),
body("status")
.optional({values:"falsy"})
.isIn(["active","completed","archived"])
.withMessage("Project status must be active, completed, or archived"),
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