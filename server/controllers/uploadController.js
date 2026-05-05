const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.upload = (req,res)=>{
  if(!req.files || !req.files.length) return res.status(400).json({message:'No files'})
  const uploads = []
  let completed = 0
  req.files.forEach(file => {
    const upload_stream = cloudinary.uploader.upload_stream({folder:'mgs_admin'}, (error, result) => {
      completed++
      if(error) uploads.push({error})
      else uploads.push(result.secure_url)
      if(completed === req.files.length) res.json({urls:uploads})
    })
    streamifier.createReadStream(file.buffer).pipe(upload_stream)
  })
}
