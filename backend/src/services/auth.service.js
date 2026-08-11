import bcrypt from "bcrypt"
import { createUser, findUserByEmail } from "../repositories/auth.repository.js"
import generateToken from "../utils/generateToken.js"
import jwt from "jsonwebtoken"
export const registerUser=async(data)=>{
const existingUser=await findUserByEmail(data.email)

if(existingUser){
const error=new Error("Email already exists")
error.statusCode=409
throw error
}

const hashedPassword=await bcrypt.hash(data.password,10)

const user=await createUser({
...data,
password:hashedPassword
})

const token=generateToken(user)

return{
user,
token
}
}
export const loginUser=async(email,password)=>{
    const user=await findUserByEmail(email)
    
    if(!user){
    const error=new Error("Invalid email or password")
    error.statusCode=401
    throw error
    }
    
    const isPasswordValid=await bcrypt.compare(password,user.password)
    
    if(!isPasswordValid){
    const error=new Error("Invalid email or password")
    error.statusCode=401
    throw error
    }
    
    const token=generateToken(user)
    
    return{
    user:{
    id:user.id,
    first_name:user.first_name,
    last_name:user.last_name,
    email:user.email,
    role:user.role
    },
    token
    }
    }