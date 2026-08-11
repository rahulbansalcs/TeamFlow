import { query } from "../config/database.js"
export const createComment=async(taskId,userId,comment)=>{
const result=await query(
`INSERT INTO task_comments(task_id,user_id,comment)
VALUES($1,$2,$3)
RETURNING *`,
[taskId,userId,comment]
)
return result.rows[0]
}
export const getCommentsByTask=async(taskId)=>{
const result=await query(
`SELECT
tc.id,
tc.task_id,
tc.user_id,
tc.comment,
tc.created_at,
tc.updated_at,
u.first_name,
u.last_name,
u.email
FROM task_comments tc
JOIN users u ON tc.user_id=u.id
WHERE tc.task_id=$1
AND tc.deleted_at IS NULL
ORDER BY tc.created_at ASC`,
[taskId]
)
return result.rows
}
export const deleteComment=async(id,userId)=>{
const result=await query(
`UPDATE task_comments
SET deleted_at=NOW(),updated_at=NOW()
WHERE id=$1
AND user_id=$2
AND deleted_at IS NULL
RETURNING *`,
[id,userId]
)
return result.rows[0]
}