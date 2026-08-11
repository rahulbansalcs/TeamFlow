import { Routes,Route,Navigate } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import Projects from "../pages/project/Projects"
import Tasks from "../pages/task/Tasks"
import Profile from "../pages/profile/Profile"
import ProtectedRoute from "./ProtectedRoute"
import MainLayout from "../layouts/MainLayout"
import ProjectDetails from "../pages/project/ProjectDetails"

export default function AppRoutes(){
return(
<Routes>
<Route path="/" element={<Navigate to="/login"/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route element={
<ProtectedRoute>
<MainLayout/>
</ProtectedRoute>
}>

<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/projects" element={<Projects/>}/>
<Route path="/tasks" element={<Tasks/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/projects/:id" element={<ProjectDetails/>}/>
</Route>

</Routes>
)
}