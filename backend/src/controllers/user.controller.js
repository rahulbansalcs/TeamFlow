import {
    fetchUsers,
    fetchUserById,
    editUserProfile
    } from "../services/user.service.js"
    export const getUsers=async(req,res,next)=>{
    try{
    const users=await fetchUsers()
    res.status(200).json({
    success:true,
    data:users
    })
    }catch(error){
    next(error)
    }
    }
    export const getMyProfile=async(req,res,next)=>{
    try{
    const user=await fetchUserById(req.user.id)
    if(!user){
    return res.status(404).json({
    success:false,
    message:"User not found"
    })
    }
    res.status(200).json({
    success:true,
    data:user
    })
    }catch(error){
    next(error)
    }
    }
    export const updateMyProfile=async(req,res,next)=>{
    try{
    const user=await editUserProfile(req.user.id,{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    phone:req.body.phone,
    jobTitle:req.body.jobTitle,
    department:req.body.department
    })
    if(!user){
    return res.status(404).json({
    success:false,
    message:"User not found"
    })
    }
    res.status(200).json({
    success:true,
    message:"Profile updated successfully",
    data:user
    })
    }catch(error){
    next(error)
    }
    }