import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.jpg'
import navProfile from '../../assets/Admin-profile.webp'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt=""  className='nav-logo'/>
      <div className='admin-profile'>
      <img src={navProfile} alt="" className='nav-profile'/>
      <h3 style={{color:'orange'}}>Admin Panel</h3>
      </div>
    </div>
  )
}

export default Navbar