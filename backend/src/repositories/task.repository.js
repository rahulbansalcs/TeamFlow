import { query } from "../config/database.js"

export const createTask=async(task)=>{
const result=await query(
`INSERT INTO tasks(project_id,assigned_to,title,description,priority,deadline)
VALUES($1,$2,$3,$4,$5,$6)
RETURNING *`,
[
task.projectId,
task.assignedTo,
task.title,
task.description,
task.priority,
task.deadline
]
)
return result.rows[0]
}

export const getTasksByProject=async(projectId,options)=>{
    const page=Number(options.page)||1
    const limit=Number(options.limit)||10
    const offset=(page-1)*limit
    
    let sql=`
    SELECT *
    FROM tasks
    WHERE project_id=$1
    AND deleted_at IS NULL
    `
    
    const values=[projectId]
    let index=2
    
    if(options.search){
    sql+=` AND LOWER(title) LIKE LOWER($${index})`
    values.push(`%${options.search}%`)
    index++
    }
    
    if(options.status){
    sql+=` AND status=$${index}`
    values.push(options.status)
    index++
    }
    
    if(options.priority){
    sql+=` AND priority=$${index}`
    values.push(options.priority)
    index++
    }
    
    const allowedSort=["created_at","deadline","priority","status","title"]
    const sort=allowedSort.includes(options.sort)?options.sort:"created_at"
    
    const order=options.order==="asc"?"ASC":"DESC"
    
    sql+=` ORDER BY ${sort} ${order}`
    
    sql+=` LIMIT $${index} OFFSET $${index+1}`
    
    values.push(limit)
    values.push(offset)
    
    const result=await query(sql,values)
    
    return result.rows
}
export const getTaskById=async(id)=>{
    const result=await query(
    `SELECT *
    FROM tasks
    WHERE id=$1
    AND deleted_at IS NULL`,
    [id]
    )
    
    return result.rows[0]
    }
export const updateTask=async(id,data)=>{
const result=await query(
`UPDATE tasks
SET
title=$1,
description=$2,
priority=$3,
deadline=$4,
updated_at=NOW()
WHERE id=$5
RETURNING *`,
[
data.title,
data.description,
data.priority,
data.deadline,
id
]
)
return result.rows[0]
}

export const updateTaskStatus=async(id,status)=>{
const result=await query(
`UPDATE tasks
SET
status=$1,
updated_at=NOW()
WHERE id=$2
RETURNING *`,
[
status,
id
]
)
return result.rows[0]
}
export const softDeleteTask=async(id)=>{
    const result=await query(
    `UPDATE tasks
    SET
    deleted_at=NOW(),
    updated_at=NOW()
    WHERE id=$1
    RETURNING *`,
    [id]
    )
    return result.rows[0]
    }
    export const deleteTask=async(id)=>{
        const result=await query(
        `UPDATE tasks
        SET
        deleted_at=NOW(),
        updated_at=NOW()
        WHERE id=$1
        RETURNING *`,
        [id]
        )
        
        return result.rows[0]
        }
        export const assignTask=async(id,userId)=>{
            const result=await query(
            `UPDATE tasks
            SET
            assigned_to=$1,
            updated_at=NOW()
            WHERE id=$2
            RETURNING *`,
            [
            userId,
            id
            ]
            )
            
            return result.rows[0]
            }
            export const attachFile=async(id,attachment)=>{
                const result=await query(
                `UPDATE tasks
                SET attachment=$1,updated_at=NOW()
                WHERE id=$2
                AND deleted_at IS NULL
                RETURNING *`,
                [attachment,id]
                )
                return result.rows[0]
                }
                export const getTaskAttachment=async(id)=>{
                    const result=await query(
                    `SELECT id,attachment
                    FROM tasks
                    WHERE id=$1
                    AND deleted_at IS NULL`,
                    [id]
                    )
                    return result.rows[0]
                    }