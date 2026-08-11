import { query } from "../config/database.js"
export const createActivity=async(data)=>{
const result=await query(
`INSERT INTO activities(user_id,project_id,task_id,action,message)
VALUES($1,$2,$3,$4,$5)
RETURNING *`,
[
data.userId,
data.projectId,
data.taskId,
data.action,
data.message
]
)
return result.rows[0]
}
export const getProjectActivities=async(projectId)=>{
const result=await query(
`SELECT a.*,u.first_name,u.last_name
FROM activities a
LEFT JOIN users u ON a.user_id=u.id
WHERE a.project_id=$1
ORDER BY a.created_at DESC`,
[projectId]
)
return result.rows
}
export const getUserActivities=async(userId)=>{
    const result=await query(
    `SELECT a.*,p.title AS project_name
    FROM activities a
    LEFT JOIN projects p ON a.project_id=p.id
    WHERE a.user_id=$1
    ORDER BY a.created_at DESC`,
    [userId]
    )
    return result.rows
    }