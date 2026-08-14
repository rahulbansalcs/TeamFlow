import { query } from "../config/database.js"

export const findUserByEmail=async(email)=>{
const result=await query(
`SELECT * FROM users WHERE email=$1`,
[email]
)
return result.rows[0]
}

export const createUser=async(user)=>{
const result=await query(
`INSERT INTO users(first_name,last_name,email,password)
VALUES($1,$2,$3,$4)
RETURNING id,first_name,last_name,email,role,created_at`,
[
user.firstName,
user.lastName,
user.email,
user.password
]
)
return result.rows[0]
}
