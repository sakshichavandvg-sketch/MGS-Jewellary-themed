const Product = require('../models/Product')

exports.list = async (req,res)=>{
  const items = await Product.find().populate('collection')
  res.json(items)
}

exports.get = async (req,res)=>{
  const p = await Product.findById(req.params.id).populate('collection')
  if(!p) return res.status(404).json({message:'Not found'})
  res.json(p)
}

exports.create = async (req,res)=>{
  const p = new Product(req.body)
  await p.save()
  res.status(201).json(p)
}

exports.update = async (req,res)=>{
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(p)
}

exports.remove = async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.json({ok:true})
}
