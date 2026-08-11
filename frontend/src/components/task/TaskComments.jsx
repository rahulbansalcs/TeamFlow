import {useEffect,useState} from "react"
import {getTaskComments,createComment,deleteComment} from "../../services/task.service"
export default function TaskComments({taskId}){
const [comments,setComments]=useState([])
const [comment,setComment]=useState("")
const [loading,setLoading]=useState(false)
const loadComments=async()=>{
try{
const response=await getTaskComments(taskId)
setComments(response.data||[])
}catch(error){
console.log(error)
}
}
useEffect(()=>{
loadComments()
},[taskId])
const handleSubmit=async e=>{
e.preventDefault()
if(!comment.trim())return
try{
setLoading(true)
await createComment(taskId,comment)
setComment("")
await loadComments()
}catch(error){
alert(error.response?.data?.message||"Failed to add comment")
}finally{
setLoading(false)
}
}
const handleDelete=async commentId=>{
if(!window.confirm("Delete this comment?"))return
try{
await deleteComment(commentId)
loadComments()
}catch(error){
alert(error.response?.data?.message||"Failed to delete comment")
}
}
return(
<div className="mt-4 border-t border-[var(--border)] pt-4">
<h4 className="font-semibold mb-3 text-[var(--text)]">Comments</h4>
<div className="space-y-3 mb-4">
{comments.length===0?(
<p className="text-sm text-[var(--muted)]">No comments yet.</p>
):(
comments.map(item=>(
<div key={item.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
<div className="flex justify-between items-start gap-3">
<div>
<p className="text-sm font-medium text-[var(--text)]">{item.first_name||item.user_first_name||"User"} {item.last_name||item.user_last_name||""}</p>
<p className="text-sm text-[var(--muted)] mt-1">{item.comment||item.content}</p>
</div>
<button onClick={()=>handleDelete(item.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
</div>
</div>
))
)}
</div>
<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
<input type="text" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a comment..." className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] rounded-lg p-2 flex-1"/>
<button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg">{loading?"Posting...":"Post"}</button>
</form>
</div>
)
}