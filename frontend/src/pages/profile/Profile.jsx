import {useEffect,useState} from "react"
import api from "../../api/axios"
export default function Profile(){
const [profile,setProfile]=useState(null)
const [loading,setLoading]=useState(true)
const [saving,setSaving]=useState(false)
const [message,setMessage]=useState("")
const [form,setForm]=useState({firstName:"",lastName:"",phone:"",jobTitle:"",department:""})
useEffect(()=>{
loadProfile()
},[])
const getHeaders=()=>{
return{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
}
const loadProfile=async()=>{
try{
const response=await api.get("/users/me",getHeaders())
const user=response.data.data
setProfile(user)
setForm({firstName:user.first_name||"",lastName:user.last_name||"",phone:user.phone||"",jobTitle:user.job_title||"",department:user.department||""})
}catch(error){
console.log(error)
}finally{
setLoading(false)
}
}
const handleChange=e=>{
setForm(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handleSubmit=async e=>{
e.preventDefault()
setSaving(true)
setMessage("")
try{
const response=await api.put("/users/me",form,getHeaders())
const user=response.data.data
setProfile(user)
setForm({firstName:user.first_name||"",lastName:user.last_name||"",phone:user.phone||"",jobTitle:user.job_title||"",department:user.department||""})
setMessage("Profile updated successfully")
}catch(error){
console.log(error)
setMessage(error.response?.data?.message||"Failed to update profile")
}finally{
setSaving(false)
}
}
if(loading){
return <div className="p-6 text-[var(--text)]">Loading profile...</div>
}
if(!profile){
return <div className="p-6 text-red-600">Unable to load profile.</div>
}
return(
<div className="max-w-3xl mx-auto p-6 text-[var(--text)]">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow p-6">
<h1 className="text-2xl font-bold mb-6">My Profile</h1>
<div className="mb-6">
<div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
{profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
</div>
<p className="mt-3 text-lg font-semibold">{profile.first_name} {profile.last_name}</p>
<p className="text-[var(--muted)]">{profile.email}</p>
</div>
<form onSubmit={handleSubmit} className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium mb-1 text-[var(--text)]">First Name</label>
<input name="firstName" value={form.firstName} onChange={handleChange} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded w-full p-2" required/>
</div>
<div>
<label className="block text-sm font-medium mb-1 text-[var(--text)]">Last Name</label>
<input name="lastName" value={form.lastName} onChange={handleChange} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded w-full p-2" required/>
</div>
</div>
<div>
<label className="block text-sm font-medium mb-1 text-[var(--text)]">Phone</label>
<input name="phone" value={form.phone} onChange={handleChange} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded w-full p-2"/>
</div>
<div>
<label className="block text-sm font-medium mb-1 text-[var(--text)]">Job Title</label>
<input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded w-full p-2"/>
</div>
<div>
<label className="block text-sm font-medium mb-1 text-[var(--text)]">Department</label>
<input name="department" value={form.department} onChange={handleChange} className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded w-full p-2"/>
</div>
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4">
{message&&<p className={`text-sm ${message.includes("successfully")?"text-green-500":"text-red-500"}`}>{message}</p>}
<button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded">{saving?"Saving...":"Save Changes"}</button>
</div>
</form>
</div>
</div>
)
}