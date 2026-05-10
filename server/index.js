require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const uploadRoutes = require('./routes/upload')

const app = express()
app.use(cors())
app.use(express.json())

// serve uploaded files if any exist in /uploads (fallback for local storage setups)
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)

// Serve built admin SPA if present at /admin
const path = require('path')
const fs = require('fs')
const adminDist = path.join(__dirname, '..', 'client', 'dist')
if (fs.existsSync(adminDist)) {
  app.use('/admin', express.static(adminDist))
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(adminDist, 'index.html'))
  })
  // Serve admin-built assets referenced with absolute paths (vite built with default /assets)
  const adminAssets = path.join(adminDist, 'assets')
  if(fs.existsSync(adminAssets)){
    app.use('/assets', express.static(adminAssets))
  }
}

// Serve top-level static site (index.html and assets) so main site links work over HTTP
const siteRoot = path.join(__dirname, '..')
app.use('/', express.static(siteRoot))

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mgs-admin').then(()=>{
  console.log('Server connected to MongoDB')
}).catch(err => {
  console.error('Mongo connect error - App will run without DB persistence', err)
})

app.listen(PORT, ()=> console.log('Server running on', PORT))
