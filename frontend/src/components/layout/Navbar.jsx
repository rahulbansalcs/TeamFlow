import {useNavigate} from "react-router-dom"
import {useTheme} from "../../context/ThemeContext"
export default function Navbar(){
const navigate=useNavigate()
const {theme,toggleTheme}=useTheme()
const logout=()=>{
localStorage.removeItem("token")
navigate("/login")
}
return(
<nav className="bg-[var(--surface)] border-b border-[var(--border)] shadow">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
<div className="flex items-center justify-between">
<h2 className="text-xl font-bold text-[var(--text)]">TeamFlow</h2>
</div>
<div className="flex flex-wrap items-center gap-2">
<button onClick={()=>navigate("/dashboard")} className="px-3 py-2 text-sm rounded text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</button>
<button onClick={()=>navigate("/projects")} className="px-3 py-2 text-sm rounded text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-700">Projects</button>
<button onClick={()=>navigate("/tasks")} className="px-3 py-2 text-sm rounded text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-700">Tasks</button>
<button onClick={()=>navigate("/profile")} className="px-3 py-2 text-sm rounded text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
<button onClick={toggleTheme} className="px-3 py-2 text-sm rounded border border-[var(--border)] text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-700">
{theme==="light"?"🌙 Dark":"☀️ Light"}
</button>
<button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm">Logout</button>
</div>
</div>
</div>
</nav>
)
}