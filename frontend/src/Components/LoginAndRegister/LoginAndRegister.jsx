import React, { useState } from 'react'
import './LoginAndRegister.css'
import { setLoggedin } from '../../Redux/slices/userSlice';
import { useDispatch } from 'react-redux';
const LoginAndRegister = () => {
  let [opaquepage,setpage]=useState('login');
  let dispatch=useDispatch()
  let [errmsg,seterrmsg]=useState('');
  let [userDetails,setuserDetails]=useState({
    name:"",
    email:"",
    password:"",
    checked:false,
  })
  function userhandler(e){
    if(e.target.name=='checked'){
      setuserDetails({...userDetails,[e.target.name]:e.target.checked})
    }else{
      setuserDetails({...userDetails,[e.target.name]:e.target.value})
    }
  }
  function setopaquepage(){
    if(opaquepage==='register') setpage('login');
    else setpage('register');
  }
  async function loginandregister(){
    let user={...userDetails}
    if(opaquepage==='login'){
      if(!userDetails.checked) return;
      let responsedata;
      await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
      }).then(res=>res.json()).then(data=>responsedata=data)
      if(responsedata.success){
        setopaquepage()
      }else if(responsedata.error==='User already exist') {
        seterrmsg(responsedata.error)
      }
    }else{
      let responsedata;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
      }).then(res=>res.json()).then(data=>responsedata=data)
      if(responsedata.success){
        localStorage.setItem('eco-token',responsedata.token)
        dispatch(setLoggedin({name:responsedata.name,email:responsedata.email,cart:responsedata.cart}))
        window.history.back()
      }else{
        seterrmsg(responsedata.error)
      }
    }
  }
  return (
    <div className='loginAndRegister'>
      <div className="loginAndRegister-container">
        <div className='loginAndRegister-header'>
          <div className={opaquepage} onClick={setopaquepage}>
          </div>
          <h1>Register</h1>
          <h1>Login</h1>
        </div>
        <div className='loginAndRegister-fields'>
          {errmsg===''?<></>:<p className='errordisplay'>{errmsg}</p>}
          {
          opaquepage==='login'?<input value={userDetails.name} onChange={userhandler} type="text" name='name' placeholder='Username'/>:<></>
          }
          <input value={userDetails.email} onChange={userhandler} type="email" name='email' placeholder='Email'/>
          <input value={userDetails.password} onChange={userhandler} type="password" name='password' placeholder='Password'/>
        </div>
        {
          opaquepage==='login'?<div className="loginAndRegister-agree">
          <input value={userDetails.checked} onChange={userhandler} type="checkbox" name="checked" id="" />
          <p>I agree to the terms of use and privacy policy</p>
          </div>:<></>
        }
        <button onClick={loginandregister}>Continue</button>
        {
          opaquepage==='login'?<p className='loginAndRegister-login'>Already have an account? <span onClick={setopaquepage}>Login here</span></p>:<p className='loginAndRegister-login'>Don't have an account? <span onClick={setopaquepage}>Register here</span></p>
        }
      </div>
      
    </div>
  )
}

export default LoginAndRegister