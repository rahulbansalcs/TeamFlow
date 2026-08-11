import { loginUser, registerUser } from "../services/auth.service.js"

export const register=async(req,res,next)=>{
try{
const result=await registerUser(req.body)

res.status(201).json({
success:true,
message:"User registered successfully",
data:result
})
}catch(error){
next(error)
}
}
export const login=async(req,res,next)=>{
    try{
    const {email,password}=req.body
    
    const result=await loginUser(email,password)
    
    res.status(200).json({
    success:true,
    message:"Login successful",
    data:result
    })
    }catch(error){
    next(error)
    }
    }