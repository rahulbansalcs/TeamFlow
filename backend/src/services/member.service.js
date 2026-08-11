import {addMember,getMembers,removeMember} from "../repositories/member.repository.js"
import {registerUser} from "./auth.service.js"
export const createMember=async(projectId,data)=>{
const result=await registerUser({
firstName:data.firstName,
lastName:data.lastName,
email:data.email,
password:data.password,
role:"member"
})
await addMember(projectId,result.user.id)
return result.user
}
export const getProjectMembers=async(projectId)=>{
return await getMembers(projectId)
}
export const deleteMember=async(projectId,userId)=>{
return await removeMember(projectId,userId)
}