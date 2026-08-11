import {createMember,getProjectMembers,deleteMember} from "../services/member.service.js"
export const addProjectMember=async(req,res,next)=>{
try{
const member=await createMember(req.body.projectId,{
firstName:req.body.firstName,
lastName:req.body.lastName,
email:req.body.email,
password:req.body.password
})
res.status(201).json({success:true,message:"Member added successfully",data:member})
}catch(error){
next(error)
}
}
export const getMembers=async(req,res,next)=>{
try{
const members=await getProjectMembers(req.params.projectId)
res.status(200).json({success:true,data:members})
}catch(error){
next(error)
}
}
export const removeProjectMember=async(req,res,next)=>{
try{
await deleteMember(req.params.projectId,req.params.userId)
res.status(200).json({success:true,message:"Member removed successfully"})
}catch(error){
next(error)
}
}