import React from 'react'
import './Product.css'
import { useNavigate } from 'react-router-dom';
const Product = (props) => {
  // let navigate=useNavigate()
  // function displayProduct(){
  //   window.scrollTo(0,0);
  //   navigate(`/product/${props.data.id}`,{state:props.data})
  // }
  return (
    <div className='product'>
      <img src={props.data.image} alt="" />
      <p>{props.data.name}</p>
      <div className="product-prices">
        <div className="new-price">
          ${props.data.new_price}
        </div>
        <div className="old-price">
          ${props.data.old_price}
        </div>
      </div>
    </div>
  )
}

export default Product