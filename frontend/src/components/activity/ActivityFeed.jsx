import {useEffect,useState} from "react"
import {getProjectActivities} from "../../services/activity.service"
export default function ActivityFeed({projectId}){
const [activities,setActivities]=useState([])
const [loading,setLoading]=useState(true)
useEffect(()=>{
loadActivities()
},[projectId])
const loadActivities=async()=>{
try{
const response=await getProjectActivities(projectId)
setActivities(response.data||[])
}catch(error){
console.log(error)
}finally{
setLoading(false)
}
}
if(loading){
return <div className="p-4 text-[var(--text)]">Loading activity...</div>
}
return(
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-4">
<h2 className="text-lg font-semibold mb-4 text-[var(--text)]">Recent Activity</h2>
{activities.length===0?(
<p className="text-[var(--muted)]">No activity yet.</p>
):(
<div className="space-y-4 max-h-80 overflow-y-auto pr-2">
{activities.map(activity=>(
<div key={activity.id} className="border-b border-[var(--border)] pb-3">
<p className="text-sm text-[var(--text)]">
<span className="font-semibold">{activity.first_name} {activity.last_name}</span>{" "}{activity.message}
</p>
<p className="text-xs text-[var(--muted)] mt-1">{new Date(activity.created_at).toLocaleString()}</p>
</div>
))}
</div>
)}
</div>
)
}