import {useEffect,useState} from "react"
import {getDashboardStats} from "../../services/dashboard.service"
import {getProjects} from "../../services/project.service"
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
    } from "recharts"
export default function Dashboard(){
const [stats,setStats]=useState(null)
const [projects,setProjects]=useState([])
useEffect(()=>{
loadDashboard()
},[])
const loadDashboard=async()=>{
try{
const statsResponse=await getDashboardStats()
setStats(statsResponse.data)
const projectsResponse=await getProjects()
setProjects(projectsResponse.data)
}catch(error){
console.log(error)
}
}
if(!stats){
return <div className="p-8 text-[var(--text)]">Loading...</div>
}
const chartData=[
{status:"Todo",count:Number(stats.todo)},
{status:"In Progress",count:Number(stats.in_progress)},
{status:"Completed",count:Number(stats.completed)}
]
const totalTasks=Number(stats.tasks)
const completedTasks=Number(stats.completed)
const progress=totalTasks===0?0:Math.round((completedTasks/totalTasks)*100)
return(
<div className="p-4 sm:p-8 text-[var(--text)]">
<h1 className="text-3xl font-bold mb-8">Dashboard</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6">
<p className="text-[var(--muted)]">Projects</p>
<h2 className="text-4xl font-bold mt-2">{stats.projects}</h2>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6">
<p className="text-[var(--muted)]">Tasks</p>
<h2 className="text-4xl font-bold mt-2">{stats.tasks}</h2>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6">
<p className="text-[var(--muted)]">Completed</p>
<h2 className="text-4xl font-bold mt-2">{stats.completed}</h2>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6">
<p className="text-[var(--muted)]">Progress</p>
<h2 className="text-4xl font-bold mt-2">{progress}%</h2>
</div>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6 mb-8">
<h2 className="text-xl font-bold mb-4">Project Progress</h2>
<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
<div className="bg-green-600 h-4 rounded-full" style={{width:`${progress}%`}}></div>
</div>
<p className="mt-3 text-[var(--muted)]">{completedTasks} of {totalTasks} tasks completed</p>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6 mb-8">
<h2 className="text-xl font-bold mb-4">Task Status Overview</h2>
<div className="h-80">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={chartData}>
<XAxis dataKey="status" tick={{fill:"currentColor"}}/>
<YAxis tick={{fill:"currentColor"}}/>
<Tooltip/>
<Bar dataKey="count">
<Cell fill="#ef4444"/>
<Cell fill="#f97316"/>
<Cell fill="#22c55e"/>
</Bar>
</BarChart>
</ResponsiveContainer>
</div>
</div>
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow p-6 overflow-x-auto">
<h2 className="text-xl font-bold mb-5">Recent Projects</h2>
<table className="w-full min-w-[600px]">
<thead>
<tr className="border-b border-[var(--border)]">
<th className="text-left py-3">Title</th>
<th className="text-left">Status</th>
<th className="text-left">Start</th>
<th className="text-left">End</th>
</tr>
</thead>
<tbody>
{projects.map(project=>(
<tr key={project.id} className="border-b border-[var(--border)]">
<td className="py-3">{project.title}</td>
<td>{project.status}</td>
<td>{project.start_date?.substring(0,10)}</td>
<td>{project.end_date?.substring(0,10)}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)
}