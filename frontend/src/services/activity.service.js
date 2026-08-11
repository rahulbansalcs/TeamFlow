import api from "../api/axios"
const getHeaders=()=>{
return{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
}
export const getProjectActivities=async(projectId)=>{
const response=await api.get(
`/activities/project/${projectId}`,
getHeaders()
)
return response.data
}
export const getUserActivities=async()=>{
const response=await api.get(
"/activities/user",
getHeaders()
)
return response.data
}