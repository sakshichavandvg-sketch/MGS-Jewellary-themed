const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.login = async (req,res)=>{
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(401).json({message:'Invalid credentials'})
  const ok = await user.comparePassword(password)
  if(!ok) return res.status(401).json({message:'Invalid credentials'})
  const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
  res.json({token})
}
