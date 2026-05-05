import React from 'react'

export default function Collections(){
  return (
    <div>
      <h2 className="text-2xl font-serif mb-4">Collections</h2>
      <p className="text-gray-600">Create and manage collections (Temple, Bridal, Rings).</p>
      <div className="mt-4 grid grid-cols-3 gap-6">
        <div className="card-lux p-4">Temple Jewellery</div>
        <div className="card-lux p-4">Bridal</div>
        <div className="card-lux p-4">Rings</div>
      </div>
    </div>
  )
}
