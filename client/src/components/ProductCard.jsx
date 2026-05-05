import React from 'react'

export default function ProductCard({product}){
  const imgRaw = product?.images?.[0]
  let imgUrl = null
  if(imgRaw){
    if(typeof imgRaw === 'string') imgUrl = imgRaw
    else imgUrl = imgRaw.url || imgRaw.secure_url || null
  }
  return (
    <div className="card-lux overflow-hidden">
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        {imgUrl ? <img src={imgUrl} alt={product.name} className="h-full object-cover"/> : <div className="text-sm text-gray-400">No image</div>}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-xl text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-2">₹{product.price}</p>
      </div>
    </div>
  )
}
