import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Collections from './pages/Collections'
import ContentManagement from './pages/ContentManagement'
import Orders from './pages/Orders'

export default function App(){
  return (
    <Routes>
      <Route path="/admin/login" element={<Login/>} />
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Dashboard/>} />
        <Route path="products" element={<Products/>} />
        <Route path="products/new" element={<ProductForm/>} />
        <Route path="products/:id/edit" element={<ProductForm/>} />
        <Route path="collections" element={<Collections/>} />
        <Route path="content" element={<ContentManagement/>} />
        <Route path="orders" element={<Orders/>} />
      </Route>
      <Route path="/" element={<Navigate to="/admin" />} />
    </Routes>
  )
}
