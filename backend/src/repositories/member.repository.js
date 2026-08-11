import { query } from "../config/database.js"

export const addMember=async(projectId,userId)=>{
const result=await query(
`INSERT INTO project_members(project_id,user_id)
VALUES($1,$2)
RETURNING *`,
[projectId,userId]
)

return result.rows[0]
}

export const getMembers=async(projectId)=>{
const result=await query(
`SELECT
users.id,
users.first_name,
users.last_name,
users.email
FROM project_members
JOIN users
ON users.id=project_members.user_id
WHERE project_members.project_id=$1
ORDER BY users.first_name`,
[projectId]
)

return result.rows
}

export const removeMember=async(projectId,userId)=>{
const result=await query(
`DELETE FROM project_members
WHERE project_id=$1
AND user_id=$2
RETURNING *`,
[projectId,userId]
)

return result.rows[0]
}