require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')

async function run(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mgs-admin')
  const exists = await User.findOne({email: 'admin@mgs.com'})
  if(exists){
    console.log('Admin already exists')
    process.exit(0)
  }
  const u = new User({email:'admin@mgs.com', password: 'Password123'})
  await u.save()
  console.log('Created admin user: admin@mgs.com / Password123')
  process.exit(0)
}

run().catch(err=>{console.error(err); process.exit(1)})
