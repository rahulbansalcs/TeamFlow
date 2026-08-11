import dotenv from "dotenv"
import pkg from "pg"

dotenv.config()

const { Pool } = pkg

const pool=new Pool({
host:process.env.DB_HOST,
port:process.env.DB_PORT,
database:process.env.DB_NAME,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
max:20,
idleTimeoutMillis:30000,
connectionTimeoutMillis:2000
})

pool.on("connect",()=>{
console.log("PostgreSQL connected")
})

pool.on("error",(err)=>{
console.error("Unexpected PostgreSQL error:",err)
process.exit(1)
})

export const query=(text,params)=>pool.query(text,params)

export default pool