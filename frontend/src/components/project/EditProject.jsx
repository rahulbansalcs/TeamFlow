import {useEffect,useState} from "react"
import {updateProject} from "../../services/project.service"
export default function EditProject({project,onUpdated,onCancel}){
const [form,setForm]=useState(project)
useEffect(()=>{
setForm(project)
},[project])
const handleChange=e=>{
setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async e=>{
e.preventDefault()
await updateProject(project.id,form)
onUpdated()
}
if(!project)return null
return(
<form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] shadow rounded-xl p-6 mb-8">
<h2 className="text-2xl font-bold mb-5">Edit Project</h2>
<input name="title" value={form.title} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-3 rounded mb-3"/>
<textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-3 rounded mb-3"/>
<select name="status" value={form.status} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-3 rounded mb-3">
<option value="active">Active</option>
<option value="completed">Completed</option>
<option value="on_hold">On Hold</option>
</select>
<div className="flex gap-3">
<button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">Save</button>
<button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded">Cancel</button>
</div>
</form>
)
}