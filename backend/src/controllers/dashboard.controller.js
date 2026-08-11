import { dashboardStats } from "../services/dashboard.service.js"

export const getDashboard=async(req,res,next)=>{

try{

const stats=await dashboardStats(req.user.id)

res.status(200).json({
success:true,
data:stats
})

}catch(error){
next(error)
}

}