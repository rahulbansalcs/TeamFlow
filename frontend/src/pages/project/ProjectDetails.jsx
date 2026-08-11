import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"
import {DragDropContext,Droppable,Draggable} from "@hello-pangea/dnd"
import {getProject} from "../../services/project.service"
import {getProjectTasks,getTaskAttachment,updateTaskStatus} from "../../services/task.service.js"
import {getMembers,addMember,removeMember} from "../../services/member.service"
import ActivityFeed from "../../components/activity/ActivityFeed"
import {getTaskComments} from "../../services/task.service.js"
export default function ProjectDetails(){
const {id}=useParams()
const [project,setProject]=useState(null)
const [tasks,setTasks]=useState([])
const totalTasks=tasks.length
const todoTasks=tasks.filter(task=>task.status==="todo").length
const inProgressTasks=tasks.filter(task=>task.status==="in_progress").length
const completedTasks=tasks.filter(task=>task.status==="completed").length
const highPriorityTasks=tasks.filter(task=>task.priority==="high").length
const mediumPriorityTasks=tasks.filter(task=>task.priority==="medium").length
const lowPriorityTasks=tasks.filter(task=>task.priority==="low").length
const completionPercentage=totalTasks===0?0:Math.round((completedTasks/totalTasks)*100)
const [search,setSearch]=useState("")
const [statusFilter,setStatusFilter]=useState("")
const [priorityFilter,setPriorityFilter]=useState("")
const [sort,setSort]=useState("created_at")
const [order,setOrder]=useState("desc")
const [members,setMembers]=useState([])
const [taskComments,setTaskComments]=useState({})
const [showMemberForm,setShowMemberForm]=useState(false)
const [memberForm,setMemberForm]=useState({firstName:"",lastName:"",email:"",password:""})
const [addingMember,setAddingMember]=useState(false)
useEffect(()=>{
loadProject()
loadMembers()
},[id])
useEffect(()=>{
if(id)loadTasks()
},[id,search,statusFilter,priorityFilter,sort,order])
const loadProject=async()=>{
try{
const response=await getProject(id)
setProject(response.data)
}catch(error){
console.log(error)
}
}
const loadTasks=async()=>{
try{
const response=await getProjectTasks(id,{search,status:statusFilter,priority:priorityFilter,sort,order})
setTasks(response.data||[])
}catch(error){
console.log(error)
}
}
const loadMembers=async()=>{
try{
const response=await getMembers(id)
setMembers(response.data||[])
}catch(error){
console.log(error)
}
}
const loadTaskComments=async taskId=>{
try{
const response=await getTaskComments(taskId)
setTaskComments(prev=>({...prev,[taskId]:response.data?.data||response.data||[]}))
}catch(error){
console.log(error)
}
}
const getAssignedMemberName=task=>{
const member=members.find(member=>String(member.user_id||member.id)===String(task.assigned_to))
return member?`${member.first_name} ${member.last_name}`:"Unassigned"
}
const handleAttachment=async taskId=>{
try{
const response=await getTaskAttachment(taskId)
const task=tasks.find(item=>item.id===taskId)
const fileName=task?.attachment||"attachment.pdf"
const blob=new Blob([response.data],{type:"application/pdf"})
const url=window.URL.createObjectURL(blob)
const link=document.createElement("a")
link.href=url
link.download=fileName
document.body.appendChild(link)
link.click()
link.remove()
window.URL.revokeObjectURL(url)
}catch(error){
console.log(error)
alert(error.response?.data?.message||"Failed to download attachment")
}
}
const handleDragEnd=async result=>{
if(!result.destination)return
const source=result.source.droppableId
const destination=result.destination.droppableId
if(source===destination)return
try{
await updateTaskStatus(result.draggableId,destination)
await loadTasks()
}catch(error){
console.log(error)
}
}
const handleMemberChange=e=>{
setMemberForm({
...memberForm,
[e.target.name]:e.target.value
})
}
const handleAddMember=async e=>{
e.preventDefault()
if(!memberForm.firstName.trim()||!memberForm.lastName.trim()||!memberForm.email.trim()||!memberForm.password.trim()){
alert("Please fill in all member details")
return
}
try{
setAddingMember(true)
await addMember({
projectId:id,
firstName:memberForm.firstName.trim(),
lastName:memberForm.lastName.trim(),
email:memberForm.email.trim(),
password:memberForm.password
})
setMemberForm({firstName:"",lastName:"",email:"",password:""})
setShowMemberForm(false)
await loadMembers()
alert("Member created and added successfully")
}catch(error){
alert(error.response?.data?.message||"Failed to add member")
}finally{
setAddingMember(false)
}
}
const handleRemoveMember=async member=>{
const userId=member.user_id||member.id
if(!userId)return
if(!window.confirm(`Remove ${member.first_name||""} ${member.last_name||""} from this project?`))return
try{
await removeMember(id,userId)
await loadMembers()
}catch(error){
alert(error.response?.data?.message||"Failed to remove member")
}
}
if(!project){
return <h2 className="p-8 text-[var(--text)]">Loading...</h2>
}
const columns=[
{title:"Todo",status:"todo"},
{title:"In Progress",status:"in_progress"},
{title:"Completed",status:"completed"}
]
return(
<div className="p-4 sm:p-6 lg:p-8 text-[var(--text)]">
<h1 className="text-3xl font-bold mb-2">{project.title}</h1>
<p className="text-[var(--muted)] mb-6">{project.description}</p>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
<h3 className="font-semibold">Status</h3>
<p className="mt-1">{project.status}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
<h3 className="font-semibold">Start Date</h3>
<p className="mt-1">{project.start_date?.substring(0,10)}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
<h3 className="font-semibold">End Date</h3>
<p className="mt-1">{project.end_date?.substring(0,10)}</p>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">Total Tasks</p>
<p className="text-2xl font-bold">{totalTasks}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">Todo</p>
<p className="text-2xl font-bold">{todoTasks}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">In Progress</p>
<p className="text-2xl font-bold">{inProgressTasks}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">Completed</p>
<p className="text-2xl font-bold">{completedTasks}</p>
</div>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4 mb-6">
<div className="flex items-center justify-between mb-2">
<p className="font-semibold">Completion</p>
<p className="font-semibold">{completionPercentage}%</p>
</div>
<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
<div className="bg-green-500 h-3 rounded-full" style={{width:`${completionPercentage}%`}}></div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">High Priority</p>
<p className="text-2xl font-bold">{highPriorityTasks}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">Medium Priority</p>
<p className="text-2xl font-bold">{mediumPriorityTasks}</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<p className="text-sm text-[var(--muted)]">Low Priority</p>
<p className="text-2xl font-bold">{lowPriorityTasks}</p>
</div>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4 mb-6">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
<input type="text" placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded p-2"/>
<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded p-2">
<option value="">All Status</option>
<option value="todo">Todo</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>
</select>
<select value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded p-2">
<option value="">All Priorities</option>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>
<select value={sort} onChange={e=>setSort(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded p-2">
<option value="created_at">Created Date</option>
<option value="deadline">Deadline</option>
<option value="priority">Priority</option>
<option value="status">Status</option>
<option value="title">Title</option>
</select>
<select value={order} onChange={e=>setOrder(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded p-2">
<option value="desc">Descending</option>
<option value="asc">Ascending</option>
</select>
</div>
<button onClick={()=>{setSearch("");setStatusFilter("");setPriorityFilter("");setSort("created_at");setOrder("desc")}} className="mt-3 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Clear Filters</button>
</div>
<DragDropContext onDragEnd={handleDragEnd}>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{columns.map(column=>(
<Droppable key={column.status} droppableId={column.status}>
{provided=>(
<div ref={provided.innerRef} {...provided.droppableProps} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 min-h-[550px]">
<h2 className="text-xl font-bold mb-4">{column.title}</h2>
{tasks.filter(task=>task.status===column.status).map((task,index)=>(
<Draggable key={task.id} draggableId={String(task.id)} index={index}>
{provided=>(
<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-4 mb-4 cursor-grab">
<h3 className="font-bold text-lg mb-2">{task.title}</h3>
<p className="text-[var(--muted)] text-sm mb-3">{task.description||"No description"}</p>
<div className="flex justify-between items-center mb-3">
<span className={`text-xs px-2 py-1 rounded ${task.priority==="high"?"bg-red-100 text-red-700":task.priority==="medium"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"}`}>{task.priority}</span>
<span className="text-xs text-[var(--muted)]">{task.deadline?.substring(0,10)||"No deadline"}</span>
</div>
<div className="text-sm text-[var(--muted)] mb-3">
Assigned to: {task.assigned_to_name||getAssignedMemberName(task)}
</div>
<div className="text-sm font-medium mb-3">
Status: {task.status==="in_progress"?"In Progress":task.status==="completed"?"Completed":"Todo"}
</div>
<div className="mt-3">
{task.attachment?(
<>
<div className="text-sm text-[var(--muted)] break-all mb-2">📎 {task.attachment}</div>
<button type="button" onClick={()=>handleAttachment(task.id)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Download Attachment</button>
</>
):(
<div className="text-sm text-[var(--muted)]">No attachment</div>
)}
</div>
<div className="mt-4 border-t border-[var(--border)] pt-4">
<h4 className="font-semibold mb-3">Comments</h4>
{!taskComments[task.id]?(
<button onClick={()=>loadTaskComments(task.id)} className="text-blue-600 hover:text-blue-700 text-sm">View Comments</button>
):taskComments[task.id].length===0?(
<p className="text-sm text-[var(--muted)]">No comments yet.</p>
):(
<div className="space-y-3 max-h-48 overflow-y-auto">
{taskComments[task.id].map(comment=>(
<div key={comment.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
<p className="text-sm font-semibold">{comment.first_name} {comment.last_name}</p>
<p className="text-sm text-[var(--muted)] mt-1">{comment.comment||comment.content}</p>
<p className="text-xs text-[var(--muted)] mt-2">{comment.created_at&&new Date(comment.created_at).toLocaleString()}</p>
</div>
))}
</div>
)}
</div>
</div>
)}
</Draggable>
))}
{provided.placeholder}
</div>
)}
</Droppable>
))}
</div>
</DragDropContext>
<div className="mt-8">
<ActivityFeed projectId={id}/>
</div>
<div className="mt-10">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
<h2 className="text-2xl font-bold">Team Members</h2>
<button type="button" onClick={()=>setShowMemberForm(prev=>!prev)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
{showMemberForm?"Cancel":"Add Member"}
</button>
</div>
{showMemberForm&&(
<form onSubmit={handleAddMember} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-5 mb-6">
<h3 className="text-lg font-semibold mb-4">Add New Member</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium mb-1">First Name</label>
<input name="firstName" value={memberForm.firstName} onChange={handleMemberChange} placeholder="First name" className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2"/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Last Name</label>
<input name="lastName" value={memberForm.lastName} onChange={handleMemberChange} placeholder="Last name" className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2"/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Email</label>
<input type="email" name="email" value={memberForm.email} onChange={handleMemberChange} placeholder="Email address" className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2"/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Password</label>
<input type="password" name="password" value={memberForm.password} onChange={handleMemberChange} placeholder="Password" className="w-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg px-3 py-2"/>
</div>
</div>
<button type="submit" disabled={addingMember} className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white px-5 py-2.5 rounded-lg">
{addingMember?"Adding...":"Create & Add Member"}
</button>
</form>
)}
{members.length===0?(
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 text-center text-[var(--muted)]">No members found.</div>
):(
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{members.map(member=>{
const userId=member.user_id||member.id
return(
<div key={userId} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-5">
<div className="flex justify-between items-center gap-3">
<div>
<h3 className="font-bold text-[var(--text)]">{member.first_name} {member.last_name}</h3>
<p className="text-[var(--muted)] text-sm">{member.email}</p>
</div>
<button type="button" onClick={()=>handleRemoveMember(member)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Remove</button>
</div>
</div>
)
})}
</div>
)}
</div>
</div>
)
}