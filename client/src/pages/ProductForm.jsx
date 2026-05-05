import React, {useState, useEffect} from 'react'
import ImageUploader from '../components/ImageUploader'
import { uploadImage } from '../services/uploadService'
import { createProduct, getProduct, updateProduct } from '../services/productService'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductForm(){
  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const nav = useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    if(!id) return
    ;(async ()=>{
      try{
        const res = await getProduct(id)
        const p = res.data
        setName(p.name || '')
        setPrice(p.price || '')
        setDescription(p.description || '')
        setImages(p.images || [])
      }catch(e){
        console.error(e)
        alert('Failed to load product')
      }
    })()
  },[id])

  async function handleSubmit(e){
    e.preventDefault()
    try{
      let urls = []
      // if there are File objects, upload them
      const filesToUpload = images.filter(i=> i instanceof File)
      if(filesToUpload.length){
        const fd = new FormData()
        filesToUpload.forEach(f=> fd.append('images', f))
        const up = await uploadImage(fd)
        urls = up.data.urls
      }
      // merge with any existing image URLs the user didn't replace
      const existingUrls = images.filter(i=> typeof i === 'string')
      const finalImages = [...existingUrls, ...urls]
      if(id){
        await updateProduct(id, {name, price, description, images: finalImages})
      }else{
        await createProduct({name, price, description, images: finalImages})
      }
      nav('/admin/products')
    }catch(e){
      console.error(e)
      alert('Error saving product')
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-serif mb-4">{id ? 'Edit Product' : 'New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-3 border rounded" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="w-full p-3 border rounded" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded" rows={6}></textarea>
        <ImageUploader onChange={(files)=>setImages(files)} initialImages={images.filter(i=> typeof i === 'string')} />
        <div className="flex gap-3">
          <button className="py-2 px-4 bg-gold text-white rounded">Save</button>
          <button type="button" className="py-2 px-4 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
