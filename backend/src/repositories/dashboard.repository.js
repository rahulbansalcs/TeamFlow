import { query } from "../config/database.js"

export const getDashboardStats=async(userId)=>{

const result=await query(
`
SELECT

(SELECT COUNT(*) FROM projects WHERE owner_id=$1) AS projects,

(SELECT COUNT(*)
FROM tasks
JOIN projects
ON tasks.project_id=projects.id
WHERE projects.owner_id=$1
AND tasks.deleted_at IS NULL) AS tasks,

(SELECT COUNT(*)
FROM tasks
JOIN projects
ON tasks.project_id=projects.id
WHERE projects.owner_id=$1
AND tasks.status='todo'
AND tasks.deleted_at IS NULL) AS todo,

(SELECT COUNT(*)
FROM tasks
JOIN projects
ON tasks.project_id=projects.id
WHERE projects.owner_id=$1
AND tasks.status='in_progress'
AND tasks.deleted_at IS NULL) AS in_progress,

(SELECT COUNT(*)
FROM tasks
JOIN projects
ON tasks.project_id=projects.id
WHERE projects.owner_id=$1
AND tasks.status='completed'
AND tasks.deleted_at IS NULL) AS completed
`,
[userId]
)

return result.rows[0]

}