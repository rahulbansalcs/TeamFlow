import { body, validationResult } from "express-validator"

export const validateRegister=[
body("firstName").trim().notEmpty().withMessage("First name is required").isLength({min:2,max:100}).withMessage("First name must be between 2 and 100 characters"),
body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({min:2,max:100}).withMessage("Last name must be between 2 and 100 characters"),
body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
body("password").isLength({min:8}).withMessage("Password must be at least 8 characters").matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter").matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter").matches(/[0-9]/).withMessage("Password must contain at least one number"),
(req,res,next)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
return res.status(400).json({
success:false,
errors:errors.array().map(error=>({
field:error.path,
message:error.msg
}))
})
}
next()
}
]
export const validateLogin=[
    body("email")
    .isEmail()
    .withMessage("Please provide a valid email"),
    body("password")
    .notEmpty()
    .withMessage("Password is required"),
    (req,res,next)=>{
    const errors=validationResult(req)
    
    if(!errors.isEmpty()){
    return res.status(400).json({
    success:false,
    errors:errors.array().map(error=>({
    field:error.path,
    message:error.msg
    }))
    })
    }
    
    next()
    }
    ]