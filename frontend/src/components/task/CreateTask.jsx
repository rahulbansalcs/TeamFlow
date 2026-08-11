import { useState } from "react"
import { createTask } from "../../services/task.service"

export default function CreateTask({projectId,onCreated}){

const [form,setForm]=useState({
title:"",
description:"",
priority:"medium",
deadline:""
})

const handleChange=e=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit=async e=>{
e.preventDefault()

await createTask({
projectId,
title:form.title,
description:form.description,
priority:form.priority,
deadline:form.deadline
})

setForm({
title:"",
description:"",
priority:"medium",
deadline:""
})

onCreated()
}

return(
<form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-8">

<h2 className="text-xl font-bold mb-4">
Add Task
</h2>

<input
name="title"
placeholder="Title"
value={form.title}
onChange={handleChange}
className="w-full border p-2 rounded mb-3"
/>

<textarea
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
className="w-full border p-2 rounded mb-3"
/>

<select
name="priority"
value={form.priority}
onChange={handleChange}
className="w-full border p-2 rounded mb-3"
>
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>

<input
type="date"
name="deadline"
value={form.deadline}
onChange={handleChange}
className="w-full border p-2 rounded mb-4"
/>

<button className="bg-blue-600 text-white px-5 py-2 rounded">
Create Task
</button>

</form>
)
}