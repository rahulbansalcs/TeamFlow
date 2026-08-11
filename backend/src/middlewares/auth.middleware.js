import jwt from "jsonwebtoken"
const authenticate=(req,res,next)=>{
const authHeader=req.headers.authorization
if(!authHeader||!authHeader.startsWith("Bearer ")){
return res.status(401).json({
success:false,
message:"Access denied. No token provided."
})
}
const token=authHeader.split(" ")[1]
if(!token){
return res.status(401).json({
success:false,
message:"Access denied. Invalid token."
})
}
try{
const decoded=jwt.verify(token,process.env.JWT_SECRET)
if(!decoded.id){
return res.status(401).json({
success:false,
message:"Invalid token."
})
}
req.user=decoded
next()
}catch(error){
return res.status(401).json({
success:false,
message:"Invalid or expired token."
})
}
}
export default authenticate