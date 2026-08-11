import api from "../api/axios"

const getHeaders=()=>({
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

export const getDashboardStats=async()=>{
const response=await api.get("/dashboard/stats",getHeaders())
return response.data
}