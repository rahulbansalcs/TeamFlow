import api from "../api/axios"

const getHeaders=()=>({
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

export const getProjects=async(params={})=>{
    const response=await api.get("/projects",{
    ...getHeaders(),
    params
    })
    
    return response.data
    }

export const createProject=async(data)=>{
const response=await api.post("/projects",data,getHeaders())
return response.data
}
export const updateProject=async(id,data)=>{
    const response=await api.put(`/projects/${id}`,data,getHeaders())
    return response.data
}
export const deleteProject=async(id)=>{
    const response=await api.delete(`/projects/${id}`,getHeaders())
    return response.data
    }
    export const getProject=async(id)=>{
        const response=await api.get(`/projects/${id}`,getHeaders())
        return response.data
        }