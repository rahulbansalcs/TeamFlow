import {
    createNewActivity,
    getActivitiesByProject,
    getActivitiesByUser
    } from "../services/activity.service.js"
    export const createActivity=async(req,res,next)=>{
    try{
    const activity=await createNewActivity({
    userId:req.user.id,
    projectId:req.body.projectId,
    taskId:req.body.taskId,
    action:req.body.action,
    message:req.body.message
    })
    res.status(201).json({
    success:true,
    message:"Activity created successfully",
    data:activity
    })
    }catch(error){
    next(error)
    }
    }
    export const getProjectActivitiesController=async(req,res,next)=>{
    try{
    const activities=await getActivitiesByProject(req.params.projectId)
    res.status(200).json({
    success:true,
    data:activities
    })
    }catch(error){
    next(error)
    }
    }
    export const getUserActivitiesController=async(req,res,next)=>{
    try{
    const activities=await getActivitiesByUser(req.user.id)
    res.status(200).json({
    success:true,
    data:activities
    })
    }catch(error){
    next(error)
    }
    }