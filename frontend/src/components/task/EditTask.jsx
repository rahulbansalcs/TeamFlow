import {useEffect,useState} from "react"
import {updateTask} from "../../services/task.service"
export default function EditTask({task,onUpdated,onCancel}){
const [form,setForm]=useState(task)
useEffect(()=>{
setForm(task)
},[task])
const handleChange=e=>{
setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async e=>{
e.preventDefault()
await updateTask(task.id,{title:form.title,description:form.description,priority:form.priority,deadline:form.deadline})
onUpdated()
}
if(!task)return null
return(
<form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-lg p-4 mb-6">
<h2 className="text-xl font-bold mb-4">Edit Task</h2>
<input name="title" value={form.title} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-2 rounded mb-3"/>
<textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-2 rounded mb-3"/>
<select name="priority" value={form.priority} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-2 rounded mb-3">
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>
<input type="date" name="deadline" value={form.deadline?.substring(0,10)||""} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-2 rounded mb-4"/>
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">Save</button>
<button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
</form>
)
}