import multer from "multer"
import path from "path"
import fs from "fs"
const uploadDir="uploads"
if(!fs.existsSync(uploadDir)){
fs.mkdirSync(uploadDir,{recursive:true})
}
const allowedExtensions=[".pdf",".doc",".docx",".txt",".png",".jpg",".jpeg"]
const storage=multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,uploadDir)
},
filename:(req,file,cb)=>{
const extension=path.extname(file.originalname).toLowerCase()
const filename=`${Date.now()}-${Math.round(Math.random()*1E9)}${extension}`
cb(null,filename)
}
})
const fileFilter=(req,file,cb)=>{
const extension=path.extname(file.originalname).toLowerCase()
if(!allowedExtensions.includes(extension)){
return cb(new Error("Only PDF, DOC, DOCX, TXT, PNG, JPG, and JPEG files are allowed"))
}
cb(null,true)
}
const upload=multer({
storage,
fileFilter,
limits:{
fileSize:5*1024*1024
}
})
export default upload