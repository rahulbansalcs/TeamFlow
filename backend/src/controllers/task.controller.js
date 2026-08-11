import {
    createNewTask,
    getProjectTasks,
    getSingleTask,
    editTask,
    changeTaskStatus,
    assignMember,
    removeTask as removeTaskService
    } from "../services/task.service.js"
    import { attachFile,getTaskAttachment } from "../repositories/task.repository.js"
    import { createNewActivity } from "../services/activity.service.js"
    export const createTask=async(req,res,next)=>{
        try{
        const task=await createNewTask(req.body)
        await createNewActivity({
        userId:req.user.id,
        projectId:task.project_id,
        taskId:task.id,
        action:"task_created",
        message:`${task.title} was created`
        })
        res.status(201).json({
        success:true,
        message:"Task created successfully",
        data:task
        })
        }catch(error){
        next(error)
        }
        }

export const getTasks=async(req,res,next)=>{
try{
    const tasks=await getProjectTasks(
        req.params.projectId,
        req.query
        )

res.status(200).json({
success:true,
data:tasks
})
}catch(error){
next(error)
}
}

export const getTask=async(req,res,next)=>{
try{
const task=await getSingleTask(req.params.id)

res.status(200).json({
success:true,
data:task
})
}catch(error){
next(error)
}
}

export const updateTask=async(req,res,next)=>{
    try{
    const task=await editTask(req.params.id,req.body)
    await createNewActivity({
    userId:req.user.id,
    projectId:task.project_id,
    taskId:task.id,
    action:"task_updated",
    message:`${task.title} was updated`
    })
    res.status(200).json({
    success:true,
    message:"Task updated successfully",
    data:task
    })
    }catch(error){
    next(error)
    }
    }

export const updateStatus=async(req,res,next)=>{
    try{
    const task=await changeTaskStatus(req.params.id,req.body.status)
    await createNewActivity({
    userId:req.user.id,
    projectId:task.project_id,
    taskId:task.id,
    action:"task_status_changed",
    message:`${task.title} status changed to ${task.status}`
    })
    res.status(200).json({
    success:true,
    message:"Task status updated successfully",
    data:task
    })
    }catch(error){
    next(error)
    }
    }
export const assignTask=async(req,res,next)=>{
    try{
    const task=await assignMember(req.params.id,req.body.assignedTo)
    await createNewActivity({
    userId:req.user.id,
    projectId:task.project_id,
    taskId:task.id,
    action:"task_assigned",
    message:`${task.title} was assigned to a member`
    })
    res.status(200).json({
    success:true,
    message:"Task assigned successfully",
    data:task
    })
    }catch(error){
    next(error)
    }
    }
export const removeTask=async(req,res,next)=>{
    try{
    
    await removeTaskService(req.params.id)
    
    res.status(200).json({
    success:true,
    message:"Task deleted successfully"
    })
    
    }catch(error){
    next(error)
    }
    }
    export const uploadTaskAttachment=async(req,res)=>{
        try{
        if(!req.file){
        return res.status(400).json({
        success:false,
        message:"No file uploaded"
        })
        }
        const task=await attachFile(req.params.id,req.file.filename)
        if(!task){
        return res.status(404).json({
        success:false,
        message:"Task not found"
        })
        }
        await createNewActivity({
        userId:req.user.id,
        projectId:task.project_id,
        taskId:task.id,
        action:"attachment_uploaded",
        message:`Attachment uploaded to ${task.title}`
        })
        return res.json({
        success:true,
        message:"Attachment uploaded successfully",
        data:task
        })
        }catch(error){
        console.log(error)
        return res.status(500).json({
        success:false,
        message:error.message
        })
        }
        }
        export const downloadTaskAttachment=async(req,res)=>{
            try{
            const task=await getTaskAttachment(req.params.id)
            if(!task||!task.attachment){
            return res.status(404).json({success:false,message:"Attachment not found"})
            }
            res.sendFile(task.attachment,{root:"uploads"},error=>{
            if(error){
            console.log(error)
            if(!res.headersSent){
            res.status(404).json({success:false,message:"File not found"})
            }
            }
            })
            }catch(error){
            console.log(error)
            return res.status(500).json({success:false,message:error.message})
            }
            }