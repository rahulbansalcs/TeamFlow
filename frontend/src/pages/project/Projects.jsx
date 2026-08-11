import {useEffect,useState} from "react"
import {getProjects,deleteProject} from "../../services/project.service"
import CreateProject from "../../components/project/CreateProject"
import EditProject from "../../components/project/EditProject"
import {Link} from "react-router-dom"
export default function Projects(){
const [projects,setProjects]=useState([])
const [editingProject,setEditingProject]=useState(null)
const [search,setSearch]=useState("")
const [status,setStatus]=useState("")
const [sort,setSort]=useState("created_at")
const [order,setOrder]=useState("desc")
useEffect(()=>{
loadProjects()
},[search,status,sort,order])
const loadProjects=async()=>{
try{
const response=await getProjects({search,status,sort,order})
setProjects(response.data)
}catch(error){
console.log(error)
}
}
const handleDelete=async(id)=>{
const confirmDelete=window.confirm("Are you sure you want to delete this project?")
if(!confirmDelete)return
try{
await deleteProject(id)
loadProjects()
}catch(error){
console.log(error)
alert(error.response?.data?.message||"Delete failed")
}
}
return(
<div className="p-4 sm:p-8 text-[var(--text)]">
<h1 className="text-3xl font-bold mb-6">Projects</h1>
<div className="flex flex-wrap gap-4 mb-6">
<input type="text" placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] p-2 rounded w-full sm:w-72"/>
<select value={status} onChange={e=>setStatus(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-2 rounded">
<option value="">All Status</option>
<option value="active">Active</option>
<option value="completed">Completed</option>
<option value="on_hold">On Hold</option>
</select>
<select value={sort} onChange={e=>setSort(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-2 rounded">
<option value="created_at">Newest</option>
<option value="title">Title</option>
<option value="status">Status</option>
<option value="start_date">Start Date</option>
<option value="end_date">End Date</option>
</select>
<select value={order} onChange={e=>setOrder(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-2 rounded">
<option value="desc">Descending</option>
<option value="asc">Ascending</option>
</select>
</div>
<CreateProject onCreated={loadProjects}/>
{editingProject&&(
<EditProject project={editingProject} onUpdated={()=>{setEditingProject(null);loadProjects()}} onCancel={()=>{setEditingProject(null)}}/>
)}
<div className="mt-6 overflow-x-auto bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow">
<table className="w-full min-w-[700px] bg-[var(--surface)]">
<thead className="bg-[var(--surface)]">
<tr className="border-b border-[var(--border)]">
<th className="p-3 text-left text-[var(--text)]">Title</th>
<th className="p-3 text-left text-[var(--text)]">Status</th>
<th className="p-3 text-left text-[var(--text)]">Start Date</th>
<th className="p-3 text-left text-[var(--text)]">End Date</th>
<th className="p-3 text-center text-[var(--text)]">Actions</th>
</tr>
</thead>
<tbody>
{projects.length===0?(
<tr>
<td colSpan="5" className="text-center p-6 text-[var(--muted)]">No projects found</td>
</tr>
):(
projects.map(project=>(
<tr key={project.id} className="border-b border-[var(--border)] hover:bg-[var(--background)]">
<td className="p-3">
<Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">{project.title}</Link>
</td>
<td className="p-3 text-[var(--text)]">{project.status}</td>
<td className="p-3 text-[var(--text)]">{project.start_date?.substring(0,10)}</td>
<td className="p-3 text-[var(--text)]">{project.end_date?.substring(0,10)}</td>
<td className="p-3">
<div className="flex justify-center gap-2">
<button onClick={()=>setEditingProject(project)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
<button onClick={()=>handleDelete(project.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
</div>
</td>
</tr>
))
)}
</tbody>
</table>
</div>
</div>
)
}