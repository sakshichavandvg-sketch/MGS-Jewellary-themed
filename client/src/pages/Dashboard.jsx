import React from 'react'
import Card from '../components/Card'

export default function Dashboard(){
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-3xl font-serif text-gray-900">128</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-3xl font-serif text-gray-900">54</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-3xl font-serif text-gray-900">₹1,24,000</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-3xl font-serif text-gray-900">312</div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <h3 className="font-serif text-xl">Recent Activity</h3>
          <ul className="mt-4 text-sm text-gray-600">
            <li>Order #123 created — ₹12,000</li>
            <li>Product Temple Kasumalai added</li>
          </ul>
        </Card>
        <Card>
          <h3 className="font-serif text-xl">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <button className="w-full py-2 bg-gold text-white rounded">Add product</button>
            <button className="w-full py-2 border rounded">Manage collections</button>
          </div>
        </Card>
      </div>
    </div>
  )
}
