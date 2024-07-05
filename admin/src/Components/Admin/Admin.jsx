import React from 'react'
import './Admin.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
const Admin = () => {
  return (
    <div className='admin'>
      <Navbar />
      <div className="admin-main">
      <Sidebar />
      <Outlet />
      </div>
    </div>
  )
}

export default Admin