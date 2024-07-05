import React from 'react'
import './Offers.css'
import exculusive_image from '../Assets/exclusive_image.png'
import { FaLongArrowAltRight } from "react-icons/fa";
const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Out</button>
      </div>
      <div className="offers-right">
        <img src={exculusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers