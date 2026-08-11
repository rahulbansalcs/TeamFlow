import {
    createActivity,
    getProjectActivities,
    getUserActivities
    } from "../repositories/activity.repository.js"
    export const createNewActivity=async(data)=>{
    return await createActivity(data)
    }
    export const getActivitiesByProject=async(projectId)=>{
    return await getProjectActivities(projectId)
    }
    export const getActivitiesByUser=async(userId)=>{
    return await getUserActivities(userId)
    }