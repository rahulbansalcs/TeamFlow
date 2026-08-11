import { query } from "../config/database.js"

export const getAllUsers=async()=>{
const result=await query(
`SELECT
id,
first_name,
last_name,
email
FROM users
ORDER BY first_name`
)

return result.rows
}
export const getUserById=async(userId)=>{
    const result=await query(
    `SELECT
    id,
    first_name,
    last_name,
    email,
    phone,
    avatar,
    job_title,
    department,
    role
    FROM users
    WHERE id=$1`,
    [userId]
    )
    return result.rows[0]
    }
    export const updateUserProfile=async(userId,data)=>{
    const result=await query(
    `UPDATE users
    SET
    first_name=$1,
    last_name=$2,
    phone=$3,
    job_title=$4,
    department=$5
    WHERE id=$6
    RETURNING
    id,
    first_name,
    last_name,
    email,
    phone,
    avatar,
    job_title,
    department,
    role`,
    [
    data.firstName,
    data.lastName,
    data.phone,
    data.jobTitle,
    data.department,
    userId
    ]
    )
    return result.rows[0]
    }
    export const createUser=async(data)=>{
        const result=await query(
        `INSERT INTO users
        (first_name,last_name,email,password,role)
        VALUES($1,$2,$3,$4,$5)
        RETURNING id,first_name,last_name,email,role`,
        [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.role||"member"
        ]
        )
        return result.rows[0]
        }