import React, { useState } from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'
import logo from '../Assets/logo.jpg'
import cartlogo from '../Assets/cartlogo.jpg'
import {useDispatch, useSelector} from 'react-redux'
import { resetState } from '../../Redux/slices/userSlice'
import noprofile from '../Assets/noprofile.png'
import profile from '../Assets/profile.png'
const Navbar = () => {
  let dispatch=useDispatch()
  let menu=useSelector(state=>state.page.page)
  let {islogedin,currentUser}=useSelector(state=>state.user)
  let cart_items=useSelector(state=>state.user.currentUser.cart)||[];
  let cart_qty=0;
  for(let i=0;i<cart_items.length;i++){
    cart_qty+=cart_items[i].qty;
  }
  let [profilevisible,setprofilevisible]=useState('hide')
  function showprofile(){
    if(profilevisible==='hide') setprofilevisible('show');
    else setprofilevisible('hide')
  }
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" style={{mixBlendMode:'multiply'}}/>
      </div>
      <div className="nav-menu">
        <ul>
          <li className='nav-item' onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>{
            menu==='home'?
            <div className="dot"><p>.</p></div>:
            <></>
          }<NavLink to='' className='nav-link'>Home</NavLink></li>
          <li className='nav-item' onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>{
            menu==='men'?
            <div className="dot"><p>.</p></div>:
            <></>
          }<NavLink to='mens' className='nav-link'>Men</NavLink></li>
          <li className='nav-item' onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>{
            menu==='women'?
            <div className="dot"><p>.</p></div>:
            <></>
          }<NavLink to='womens' className='nav-link'>Women</NavLink></li>
          <li className='nav-item' onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>{
            menu==='kid'?
            <div className="dot"><p>.</p></div>:
            <></>
          }<NavLink to='kids' className='nav-link'>Kid</NavLink></li>
        </ul>
      </div>
      <div className="nav-login">
        
        {islogedin?<div className='nav-link'><button onClick={()=>{localStorage.removeItem('eco-token');dispatch(resetState())}}>Logout</button></div>:
        <NavLink to="login" className='nav-link'><button onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}>Login</button></NavLink>}
        <div className='nav-cart'>
          <div className="nav-cart-count">
            {cart_qty}
          </div>
          <NavLink to="cart" className='nav-link'>
          <img onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}} src={cartlogo} alt="" style={{mixBlendMode:'multiply'}}/>
          </NavLink>
        </div>
        <div className="profile">
          { islogedin?<img onClick={showprofile} className="profile" src={profile} alt="" />:
            <NavLink to="login" >
              <img onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} className="profile" src={noprofile} alt="" />
            </NavLink>
              
          }
        </div>
        <div className={`profilediv ${profilevisible}`}>
          <p>{currentUser.name}</p>
          <p>{currentUser.email}</p>
          <hr />
          <NavLink to="cart" className='nav-link profile-element' onClick={()=>{
            window.scrollTo({ top: 0, behavior: 'smooth' });showprofile();}}>
            My Cart
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar