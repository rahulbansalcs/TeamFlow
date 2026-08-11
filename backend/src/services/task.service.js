import {
    createTask,
    getTasksByProject,
    getTaskById,
    updateTask,
    updateTaskStatus,
    assignTask,
    deleteTask
    } from "../repositories/task.repository.js"
    
    export const createNewTask=async(data)=>{
    return await createTask({
    projectId:data.projectId,
    assignedTo:data.assignedTo||null,
    title:data.title,
    description:data.description,
    priority:data.priority||"medium",
    deadline:data.deadline||null
    })
    }
    
    export const getProjectTasks=async(projectId,options)=>{
    return await getTasksByProject(projectId,options)
    }
    
    export const getSingleTask=async(id)=>{
    const task=await getTaskById(id)
    
    if(!task){
    const error=new Error("Task not found")
    error.statusCode=404
    throw error
    }
    
    return task
    }
    
    export const editTask=async(id,data)=>{
    const task=await getTaskById(id)
    
    if(!task){
    const error=new Error("Task not found")
    error.statusCode=404
    throw error
    }
    
    return await updateTask(id,data)
    }
    
    export const changeTaskStatus=async(id,status)=>{
    const task=await getTaskById(id)
    
    if(!task){
    const error=new Error("Task not found")
    error.statusCode=404
    throw error
    }
    
    const allowed=["todo","in_progress","completed"]
    
    if(!allowed.includes(status)){
    const error=new Error("Invalid status")
    error.statusCode=400
    throw error
    }
    
    return await updateTaskStatus(id,status)
    }
    
    export const removeTask=async(id)=>{
    const task=await getTaskById(id)
    
    if(!task){
    const error=new Error("Task not found")
    error.statusCode=404
    throw error
    }
    
    return await softDeleteTask(id)
    }
    export const assignMember=async(id,userId)=>{

        const task=await getTaskById(id)
        
        if(!task){
        const error=new Error("Task not found")
        error.statusCode=404
        throw error
        }
        
        return await assignTask(id,userId)
        
        }
        export const attachTaskFile=async(id,attachment)=>{
            return await attachFile(id,attachment)
            }
            export const uploadTaskAttachment=async(taskId,file)=>{
                const formData=new FormData()
                formData.append("file",file)
                const response=await api.post(`/tasks/${taskId}/attachment`,formData,getHeaders())
                return response.data
                }