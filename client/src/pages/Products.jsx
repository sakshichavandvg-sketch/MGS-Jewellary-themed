import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import ProductCard from '../components/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import { listProducts, deleteProduct } from '../services/productService'

export default function Products(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch()
  },[])

  async function fetch(){
    try{
      const res = await listProducts()
      setItems(res.data)
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif">Products</h2>
        <Link to="/admin/products/new" className="py-2 px-4 bg-gold text-white rounded">Add Product</Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {items.length === 0 && (
          <Card>
            <div className="text-gray-500">No products yet</div>
          </Card>
        )}
        {items.map(it=> (
          <div key={it._id} className="relative">
            <ProductCard product={it} />
            <div className="absolute top-2 right-2 flex gap-2">
              <Link to={`/admin/products/${it._id}/edit`} className="py-1 px-2 bg-white border rounded text-sm">Edit</Link>
              <button onClick={async ()=>{
                if(!confirm('Delete this product?')) return
                try{
                  await deleteProduct(it._id)
                  fetch()
                  alert('Deleted')
                }catch(e){
                  console.error(e)
                  alert('Delete failed')
                }
              }} className="py-1 px-2 bg-red-600 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
