import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../services/auth.service"

export default function Register(){
const navigate=useNavigate()

const [form,setForm]=useState({
firstName:"",
lastName:"",
email:"",
password:""
})

const handleChange=e=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit=async e=>{
e.preventDefault()

try{
await registerUser(form)
alert("Registration successful")
navigate("/login")
}catch(error){
alert(error.response?.data?.message||"Registration failed")
}
}

return(
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
<h1 className="text-3xl font-bold text-center">Register</h1>

<input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-full border rounded-lg p-3"/>

<input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full border rounded-lg p-3"/>

<input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded-lg p-3"/>

<input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border rounded-lg p-3"/>

<button className="w-full bg-green-600 text-white rounded-lg p-3">
Register
</button>

</form>
</div>
)
}