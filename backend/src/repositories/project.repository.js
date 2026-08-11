import { query } from "../config/database.js"

export const createProject=async(project)=>{
const result=await query(
`INSERT INTO projects(title,description,owner_id,start_date,end_date)
VALUES($1,$2,$3,$4,$5)
RETURNING *`,
[
project.title,
project.description,
project.ownerId,
project.startDate,
project.endDate
]
)

return result.rows[0]
}

export const getProjectsByOwner=async(ownerId,filters={})=>{

    let sql=`
    SELECT *
    FROM projects
    WHERE owner_id=$1
    `
    
    const values=[ownerId]
    let index=2
    
    if(filters.search){
    sql+=` AND LOWER(title) LIKE LOWER($${index})`
    values.push(`%${filters.search}%`)
    index++
    }
    
    if(filters.status){
    sql+=` AND status=$${index}`
    values.push(filters.status)
    index++
    }
    
    const allowedSort=["created_at","title","status","start_date","end_date"]
    const sort=allowedSort.includes(filters.sort)?filters.sort:"created_at"
    
    const order=filters.order==="asc"?"ASC":"DESC"
    
    sql+=` ORDER BY ${sort} ${order}`
    
    const result=await query(sql,values)
    
    return result.rows
    }

export const updateProject=async(id,data)=>{
const result=await query(
`UPDATE projects
SET
title=$1,
description=$2,
status=$3,
start_date=$4,
end_date=$5,
updated_at=NOW()
WHERE id=$6
RETURNING *`,
[
data.title,
data.description,
data.status,
data.startDate,
data.endDate,
id
]
)

return result.rows[0]
}
export const deleteProject=async(id)=>{
    const result=await query(
    `DELETE FROM projects
    WHERE id=$1
    RETURNING *`,
    [id]
    )
    
    return result.rows[0]
    }
    export const getProjectById=async(id)=>{
        const result=await query(
        `SELECT *
        FROM projects
        WHERE id=$1`,
        [id]
        )
        
        return result.rows[0]
        }