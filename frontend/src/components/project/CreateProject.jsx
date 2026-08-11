import {useState} from "react"
import {createProject} from "../../services/project.service"
export default function CreateProject({onCreated}){
const [form,setForm]=useState({title:"",description:"",status:"active",startDate:"",endDate:""})
const handleChange=e=>{
setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async e=>{
e.preventDefault()
try{
await createProject(form)
setForm({title:"",description:"",status:"active",startDate:"",endDate:""})
onCreated()
}catch(error){
alert(error.response?.data?.message||"Unable to create project")
}
}
return(
<form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-xl shadow mb-8 text-[var(--text)]">
<h2 className="text-2xl font-bold mb-5">Create Project</h2>
<input name="title" placeholder="Project Title" value={form.title} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-3 rounded mb-3"/>
<textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-3 rounded mb-3"/>
<select name="status" value={form.status} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-3 rounded mb-3">
<option value="active">Active</option>
<option value="completed">Completed</option>
<option value="on_hold">On Hold</option>
</select>
<input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-3 rounded mb-3"/>
<input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-3 rounded mb-5"/>
<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">Create Project</button>
</form>
)
}