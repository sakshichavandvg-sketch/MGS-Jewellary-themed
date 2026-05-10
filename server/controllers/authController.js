const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mongoose = require('mongoose')

exports.login = async (req,res)=>{
  const {email, password} = req.body

  // Hardcoded fallback for development if MongoDB is not connected
  if (mongoose.connection.readyState !== 1) {
    const normalizedEmail = (email || '').trim().toLowerCase()
    if (normalizedEmail === 'admin@mgs.com' && password === 'Password123') {
       const token = jwt.sign({id: 'mock_id', email: 'admin@mgs.com'}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
       return res.json({token})
    }
    return res.status(401).json({message:'Invalid credentials (Database disconnected)'})
  }

  try {
    const user = await User.findOne({email})
    if(!user) return res.status(401).json({message:'Invalid credentials'})
    const ok = await user.comparePassword(password)
    if(!ok) return res.status(401).json({message:'Invalid credentials'})
    const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
    res.json({token})
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({message: 'Server error'})
  }
}
