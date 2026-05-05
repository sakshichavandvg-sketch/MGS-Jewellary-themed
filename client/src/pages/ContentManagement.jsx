import React from 'react'

export default function ContentManagement(){
  return (
    <div>
      <h2 className="text-2xl font-serif">Content Management</h2>
      <p className="text-gray-600 mt-2">Edit homepage hero, banners, and gold-rate display.</p>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="card-lux p-4">Hero Text Editor (WYSIWYG stub)</div>
        <div className="card-lux p-4">Banner Uploads</div>
      </div>
    </div>
  )
}
