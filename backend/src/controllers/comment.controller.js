import { addComment,getTaskComments,removeComment } from "../services/comment.service.js"
import { createNewActivity } from "../services/activity.service.js"
import { getSingleTask } from "../services/task.service.js"
export const createComment=async(req,res,next)=>{
try{
const {taskId,comment}=req.body
const userId=req.user.id
const data=await addComment(taskId,userId,comment)
const task=await getSingleTask(taskId)
await createNewActivity({
userId,
projectId:task.project_id,
taskId:task.id,
action:"comment_added",
message:`Comment added to ${task.title}`
})
res.status(201).json({
success:true,
message:"Comment added successfully",
data
})
}catch(error){
next(error)
}
}
export const getComments=async(req,res,next)=>{
try{
const data=await getTaskComments(req.params.taskId)
res.status(200).json({
success:true,
data
})
}catch(error){
next(error)
}
}
export const deleteComment=async(req,res,next)=>{
try{
const userId=req.user.id
const data=await removeComment(req.params.id,userId)
res.status(200).json({
success:true,
message:"Comment deleted successfully",
data
})
}catch(error){
next(error)
}
}