import {
    createComment,
    getCommentsByTask,
    deleteComment
    } from "../repositories/comment.repository.js"
    export const addComment=async(taskId,userId,comment)=>{
    if(!comment||!comment.trim()){
    const error=new Error("Comment cannot be empty")
    error.statusCode=400
    throw error
    }
    return await createComment(taskId,userId,comment.trim())
    }
    export const getTaskComments=async(taskId)=>{
    return await getCommentsByTask(taskId)
    }
    export const removeComment=async(id,userId)=>{
    const comment=await deleteComment(id,userId)
    if(!comment){
    const error=new Error("Comment not found or you are not allowed to delete it")
    error.statusCode=404
    throw error
    }
    return comment
    }