import {
    createProject,
    getProjectsByOwner,
    updateProject,
    deleteProject,
    getProjectById
    } from "../repositories/project.repository.js"
    
    export const createNewProject=async(data,userId)=>{
    return await createProject({
    title:data.title,
    description:data.description,
    ownerId:userId,
    startDate:data.startDate,
    endDate:data.endDate
    })
    }
    
    export const getAllProjects=async(userId,filters)=>{
        return await getProjectsByOwner(userId,filters)
        }
    
    export const editProject=async(id,data)=>{
    return await updateProject(id,{
    title:data.title,
    description:data.description,
    status:data.status,
    startDate:data.startDate,
    endDate:data.endDate
    })
    }
    
    export const removeProject=async(id)=>{
    return await deleteProject(id)
    }
    export const getSingleProject=async(id)=>{
        const project=await getProjectById(id)
        
        if(!project){
        const error=new Error("Project not found")
        error.statusCode=404
        throw error
        }
        
        return project
        }