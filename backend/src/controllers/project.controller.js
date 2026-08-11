import {
    createNewProject,
    getAllProjects,
    editProject,
    removeProject,
    getSingleProject
    } from "../services/project.service.js"
    
    export const createProject=async(req,res,next)=>{
    try{
    const project=await createNewProject(req.body,req.user.id)
    
    res.status(201).json({
    success:true,
    message:"Project created successfully",
    data:project
    })
    }catch(error){
    next(error)
    }
    }
    
    export const getProjects=async(req,res,next)=>{
    try{
        const projects=await getAllProjects(req.user.id,{
            search:req.query.search,
            status:req.query.status,
            sort:req.query.sort,
            order:req.query.order
            })
    
    res.status(200).json({
    success:true,
    data:projects
    })
    }catch(error){
    next(error)
    }
    }
    
    export const updateProject=async(req,res,next)=>{
    try{
    const project=await editProject(req.params.id,req.body)
    
    res.status(200).json({
    success:true,
    message:"Project updated successfully",
    data:project
    })
    }catch(error){
    next(error)
    }
    }
    
    export const deleteProject=async(req,res,next)=>{
    try{
    await removeProject(req.params.id)
    
    res.status(200).json({
    success:true,
    message:"Project deleted successfully"
    })
    }catch(error){
    next(error)
    }
    }
    export const getProject=async(req,res,next)=>{
        try{
        
        const project=await getSingleProject(req.params.id)
        
        res.status(200).json({
        success:true,
        data:project
        })
        
        }catch(error){
        next(error)
        }
        }