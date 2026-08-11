import api from "../api/axios"

const getHeaders=()=>({
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

export const getMembers=async(projectId)=>{
const response=await api.get(
`/members/project/${projectId}`,
getHeaders()
)
return response.data
}

export const addMember=async(data)=>{
const response=await api.post(
"/members",
data,
getHeaders()
)
return response.data
}

export const removeMember=async(projectId,userId)=>{
const response=await api.delete(
`/members/${projectId}/${userId}`,
getHeaders()
)
return response.data
}

export const getUsers=async()=>{
const response=await api.get(
"/users",
getHeaders()
)
return response.data
}