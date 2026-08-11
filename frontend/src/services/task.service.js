import api from "../api/axios"

const getHeaders=()=>{
    return{
    headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
    }
    }
    }

    export const getProjectTasks=async(projectId,options={})=>{
        const params=new URLSearchParams()
        if(options.search)params.append("search",options.search)
        if(options.status)params.append("status",options.status)
        if(options.priority)params.append("priority",options.priority)
        if(options.sort)params.append("sort",options.sort)
        if(options.order)params.append("order",options.order)
        if(options.page)params.append("page",options.page)
        if(options.limit)params.append("limit",options.limit)
        const queryString=params.toString()
        const response=await api.get(
        `/tasks/project/${projectId}${queryString?`?${queryString}`:""}`,
        getHeaders()
        )
        return response.data
        }

export const createTask=async(data)=>{
const response=await api.post(
"/tasks",
data,
getHeaders()
)
return response.data
}

export const updateTask=async(id,data)=>{
const response=await api.put(
`/tasks/${id}`,
data,
getHeaders()
)
return response.data
}

export const deleteTask=async(id)=>{
const response=await api.delete(
`/tasks/${id}`,
getHeaders()
)
return response.data
}

export const updateTaskStatus=async(id,status)=>{
const response=await api.patch(
`/tasks/${id}/status`,
{status},
getHeaders()
)
return response.data
}

export const assignTask=async(taskId,assignedTo)=>{
const response=await api.patch(
`/tasks/${taskId}/assign`,
{assignedTo},
getHeaders()
)
return response.data
}
export const getTaskComments=async(taskId)=>{
    const response=await api.get(
    `/comments/task/${taskId}`,
    getHeaders()
    )
    return response.data
    }
    export const createComment=async(taskId,comment)=>{
    const response=await api.post(
    "/comments",
    {taskId,comment},
    getHeaders()
    )
    return response.data
    }
    export const deleteComment=async(commentId)=>{
    const response=await api.delete(
    `/comments/${commentId}`,
    getHeaders()
    )
    return response.data
    }

    export const getTaskAttachment=async(taskId)=>{
        const response=await api.get(`/tasks/${taskId}/attachment`,{
        ...getHeaders(),
        responseType:"blob"
        })
        return response
        }
    export const uploadTaskAttachment=async(taskId,file)=>{
        const formData=new FormData()
        formData.append("file",file)
        const response=await api.post(`/tasks/${taskId}/attachment`,formData,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        })
        return response.data
        }