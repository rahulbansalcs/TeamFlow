import Navbar from "../components/layout/Navbar"
import {Outlet} from "react-router-dom"
export default function MainLayout(){
return(
<div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
<Navbar/>
<main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
<div className="w-full max-w-7xl mx-auto">
<Outlet/>
</div>
</main>
</div>
)
}