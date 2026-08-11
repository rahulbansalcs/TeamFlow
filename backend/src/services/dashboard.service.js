import { getDashboardStats } from "../repositories/dashboard.repository.js"

export const dashboardStats=async(userId)=>{

return await getDashboardStats(userId)

}