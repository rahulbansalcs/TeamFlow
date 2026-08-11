import dotenv from "dotenv"
import app from "./app.js"
import pool from "./config/database.js"

dotenv.config()

const PORT=process.env.PORT||8000

pool.query("SELECT NOW()")
.then(()=>{
console.log("Database connected successfully")
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})
})
.catch(err=>{
console.error("Database connection failed")
console.error(err)
})