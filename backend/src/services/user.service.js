import {getAllUsers,getUserById,updateUserProfile,createUser} from "../repositories/user.repository.js"
    export const fetchUsers=async()=>{
    return await getAllUsers()
    }
    export const fetchUserById=async(userId)=>{
    return await getUserById(userId)
    }
    export const editUserProfile=async(userId,data)=>{
    return await updateUserProfile(userId,data)
    }
    export const registerUser=async(data)=>{
        return await createUser(data)
        }