import React from 'react'
import './Productpage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import DescriptionBox from '../DescriptionBox/DescriptionBox'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import { useDispatch } from 'react-redux'
import { SetCart } from '../../Redux/slices/userSlice'
const Productpage = () => {
  let {state}=useLocation();
  let navigate=useNavigate()
  let dispatch=useDispatch();
  async function AddtoCart(){
    let product={...state,qty:1}
    let result;
      await fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          token:localStorage.getItem('eco-token')
        },
        body:JSON.stringify(product)
      }).then(res=>res.json()).then(data=>result=data)
      if(result.payload==='jwt malformed') {
        navigate('/login')
        return;
      }
      dispatch(SetCart(result.cart))
  }
  return (
    <div>
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={state.image} alt="" />
          <img src={state.image} alt="" />
          <img src={state.image} alt="" />
          <img src={state.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={state.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{state.name}</h1>
        
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${state.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${state.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis quia ipsam ducimus quibusdam quidem, qui itaque velit rem eligendi.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>AddtoCart()}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Women ,T-Shirt , Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest 
        </p>
      </div>
    </div>
    <DescriptionBox />
    <RelatedProducts />
    </div>
  )
}

export default Productpage