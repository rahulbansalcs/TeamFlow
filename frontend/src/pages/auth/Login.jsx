import {useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import {loginUser} from "../../services/auth.service"
export default function Login(){
const navigate=useNavigate()
const [form,setForm]=useState({email:"",password:""})
const handleChange=e=>{
setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async e=>{
e.preventDefault()
try{
const response=await loginUser(form)
localStorage.setItem("token",response.data.token)
navigate("/dashboard")
}catch(error){
alert(error.response?.data?.message||"Login failed")
}
}
return(
<div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
<div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl p-8">
<div className="text-center mb-8">
<h1 className="text-3xl font-bold text-[var(--text)]">TeamFlow</h1>
<p className="text-[var(--muted)] mt-2">Sign in to your account</p>
</div>
<form onSubmit={handleSubmit} className="space-y-5">
<div>
<label className="block text-sm font-medium text-[var(--text)] mb-2">Email</label>
<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required className="w-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--muted)] border border-[var(--border)] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"/>
</div>
<div>
<label className="block text-sm font-medium text-[var(--text)] mb-2">Password</label>
<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required className="w-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--muted)] border border-[var(--border)] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"/>
</div>
<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-medium transition">Login</button>
</form>
<p className="text-center text-sm text-[var(--muted)] mt-6">
Don't have an account?{" "}
<Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register</Link>
</p>
</div>
</div>
)
}