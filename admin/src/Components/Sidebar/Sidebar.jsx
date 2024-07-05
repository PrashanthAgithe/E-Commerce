import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg';
import all_products_icon from '../../assets/Product_list_icon.svg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to='addproduct' className='nav-link'>
        <div className='sidebar-item'>
          <img src={add_product_icon} alt="" /> Add Product
        </div>
        </NavLink>
      <NavLink to='allproduct' className='nav-link'>
        <div className='sidebar-item'>
          <img src={all_products_icon} alt="" /> All Product
        </div>
        </NavLink>
      
    </div>
  )
}

export default Sidebar