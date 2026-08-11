import {useEffect,useState} from "react"
import {createTask,getProjectTasks,updateTask,deleteTask,updateTaskStatus,assignTask,uploadTaskAttachment} from "../../services/task.service"
import {getMembers} from "../../services/member.service"
import api from "../../api/axios"
import TaskComments from "../../components/task/TaskComments"
export default function Tasks(){
const [projects,setProjects]=useState([])
const [members,setMembers]=useState([])
const [tasks,setTasks]=useState([])
const [loading,setLoading]=useState(false)
const [saving,setSaving]=useState(false)
const [uploadingTask,setUploadingTask]=useState(null)
const [error,setError]=useState("")
const [showForm,setShowForm]=useState(false)
const [editingId,setEditingId]=useState(null)
const [selectedProject,setSelectedProject]=useState("")
const [form,setForm]=useState({projectId:"",title:"",description:"",priority:"medium",status:"pending",deadline:""})
useEffect(()=>{
loadProjects()
},[])
useEffect(()=>{
if(selectedProject){
loadTasks(selectedProject)
loadMembers(selectedProject)
}else{
setTasks([])
setMembers([])
}
},[selectedProject])
const loadProjects=async()=>{
try{
const response=await api.get("/projects",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
const data=response.data?.data||response.data||[]
setProjects(data)
}catch(error){
setError(error.response?.data?.message||"Failed to load projects")
}
}
const loadMembers=async projectId=>{
try{
const response=await getMembers(projectId)
setMembers(response.data||[])
}catch(error){
setMembers([])
}
}
const loadTasks=async projectId=>{
try{
setLoading(true)
setError("")
const response=await getProjectTasks(projectId)
setTasks(response.data||[])
}catch(error){
setError(error.response?.data?.message||"Failed to load tasks")
}finally{
setLoading(false)
}
}
const handleChange=e=>{
setForm({...form,[e.target.name]:e.target.value})
}
const resetForm=()=>{
setForm({projectId:selectedProject,title:"",description:"",priority:"medium",status:"pending",deadline:""})
setEditingId(null)
}
const openCreate=()=>{
resetForm()
setShowForm(true)
}
const openEdit=task=>{
setForm({projectId:task.project_id||task.projectId||selectedProject,title:task.title||"",description:task.description||"",priority:task.priority||"medium",status:task.status||"pending",deadline:task.deadline?new Date(task.deadline).toISOString().slice(0,16):""})
setEditingId(task.id)
setShowForm(true)
}
const handleSubmit=async e=>{
e.preventDefault()
if(!form.projectId||!form.title.trim()){
setError("Project and task title are required")
return
}
try{
setSaving(true)
setError("")
const payload={...form,deadline:form.deadline||null}
if(editingId){
await updateTask(editingId,payload)
}else{
await createTask(payload)
}
setShowForm(false)
resetForm()
await loadTasks(form.projectId)
}catch(error){
setError(error.response?.data?.message||"Failed to save task")
}finally{
setSaving(false)
}
}
const handleAssign=async(taskId,assignedTo)=>{
try{
await assignTask(taskId,assignedTo)
setTasks(prev=>prev.map(task=>task.id===taskId?{...task,assigned_to:assignedTo}:task))
}catch(error){
setError(error.response?.data?.message||"Failed to assign task")
}
}
const handleDelete=async id=>{
if(!window.confirm("Are you sure you want to delete this task?"))return
try{
await deleteTask(id)
setTasks(prev=>prev.filter(task=>task.id!==id))
}catch(error){
setError(error.response?.data?.message||"Failed to delete task")
}
}
const handleStatus=async(id,status)=>{
try{
await updateTaskStatus(id,status)
setTasks(prev=>prev.map(task=>task.id===id?{...task,status}:task))
}catch(error){
setError(error.response?.data?.message||"Failed to update task status")
}
}
const handleUploadAttachment=async(taskId,e)=>{
const file=e.target.files[0]
if(!file)return
try{
setUploadingTask(taskId)
const response=await uploadTaskAttachment(taskId,file)
const attachment=response?.data?.attachment
if(!attachment){
throw new Error("Server did not return an attachment filename")
}
setTasks(prev=>prev.map(task=>task.id===taskId?{...task,attachment}:task))
alert("Attachment uploaded successfully")
e.target.value=""
}catch(error){
alert(error.response?.data?.message||error.message||"Failed to upload attachment")
}finally{
setUploadingTask(null)
}
}
const getPriorityClass=priority=>{
if(priority==="high")return"bg-red-100 text-red-700 border border-red-200"
if(priority==="medium")return"bg-yellow-100 text-yellow-700 border border-yellow-200"
return"bg-green-100 text-green-700 border border-green-200"
}
return(
<div className="w-full text-[var(--text)]">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
<div>
<h1 className="text-2xl sm:text-3xl font-bold">Tasks</h1>
<p className="text-[var(--muted)] mt-1">Create and manage your project tasks</p>
</div>
<button onClick={openCreate} disabled={!selectedProject} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300 text-white px-5 py-2.5 rounded-lg">Add Task</button>
</div>
{error&&<div className="mb-5 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">{error}</div>}
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-4 mb-6">
<label className="block text-sm font-medium mb-2">Select Project</label>
<select value={selectedProject} onChange={e=>setSelectedProject(e.target.value)} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2">
<option value="">Select a project</option>
{projects.map(project=><option key={project.id} value={project.id}>{project.title||project.name}</option>)}
</select>
</div>
{showForm&&(
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-5 sm:p-6 mb-6">
<div className="flex justify-between items-center mb-5">
<h2 className="text-xl font-semibold"> {editingId?"Edit Task":"Create Task"}</h2>
<button onClick={()=>{setShowForm(false);resetForm()}} className="text-[var(--muted)] hover:text-[var(--text)] text-xl">×</button>
</div>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm font-medium mb-1">Project</label>
<select name="projectId" value={form.projectId} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2">
<option value="">Select a project</option>
{projects.map(project=><option key={project.id} value={project.id}>{project.title||project.name}</option>)}
</select>
</div>
<div>
<label className="block text-sm font-medium mb-1">Title</label>
<input name="title" value={form.title} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2" placeholder="Enter task title"/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Description</label>
<textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2" placeholder="Enter task description"/>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium mb-1">Priority</label>
<select name="priority" value={form.priority} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2">
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>
</div>
<div>
<label className="block text-sm font-medium mb-1">Status</label>
<select name="status" value={form.status} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2">
<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>
</select>
</div>
</div>
<div>
<label className="block text-sm font-medium mb-1">Deadline</label>
<input type="datetime-local" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2"/>
</div>
<div className="flex flex-col sm:flex-row gap-3 pt-2">
<button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white px-5 py-2.5 rounded-lg">{saving?"Saving...":editingId?"Update Task":"Create Task"}</button>
<button type="button" onClick={()=>{setShowForm(false);resetForm()}} className="border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-lg hover:bg-[var(--surface-hover)]">Cancel</button>
</div>
</form>
</div>
)}
{!selectedProject?<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-8 text-center text-[var(--muted)]">Select a project to view its tasks.</div>:loading?<div className="text-center py-10 text-[var(--muted)]">Loading tasks...</div>:tasks.length===0?<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-8 text-center text-[var(--muted)]">No tasks found for this project.</div>:<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
{tasks.map(task=>(
<div key={task.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-5">
<div className="flex justify-between items-start gap-3">
<h3 className="font-semibold text-lg text-[var(--text)]">{task.title}</h3>
<span className={`text-xs px-2 py-1 rounded ${getPriorityClass(task.priority)}`}>{task.priority}</span>
</div>
<p className="text-[var(--muted)] text-sm mt-2">{task.description||"No description"}</p>
<div className="mt-4">
<label className="text-sm font-medium">Assign To</label>
<select value={task.assigned_to||""} onChange={e=>handleAssign(task.id,e.target.value)} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2 mt-1">
<option value="">Unassigned</option>
{members.map(member=><option key={member.user_id||member.id} value={member.user_id||member.id}>{member.first_name} {member.last_name}</option>)}
</select>
</div>
<div className="mt-4">
<label className="text-sm font-medium">Status</label>
<select value={task.status||"pending"} onChange={e=>handleStatus(task.id,e.target.value)} className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-lg px-3 py-2 mt-1">
<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>
</select>
</div>
{task.deadline&&<p className="text-sm text-[var(--muted)] mt-3">Deadline: {new Date(task.deadline).toLocaleString()}</p>}
<div className="mt-4">
<label className="text-sm font-medium block mb-2">Attachment</label>
<input type="file" onChange={e=>handleUploadAttachment(task.id,e)} disabled={uploadingTask===task.id} className="w-full text-sm text-[var(--text)] file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"/>
{uploadingTask===task.id&&<p className="text-sm text-blue-500 mt-2">Uploading...</p>}
{task.attachment&&<p className="text-sm text-[var(--muted)] mt-2 break-all">📎 {task.attachment}</p>}
</div>
<div className="flex gap-2 mt-5">
<button onClick={()=>openEdit(task)} className="flex-1 border border-[var(--border)] text-[var(--text)] px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)]">Edit</button>
<button onClick={()=>handleDelete(task.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">Delete</button>
</div>
<TaskComments taskId={task.id}/>
</div>
))}
</div>}
</div>
)
}