import React from 'react'
import './Cart.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { SetCart } from '../../Redux/slices/userSlice'
const Cart = () => {
  let dispatch=useDispatch()
  let cart_items=useSelector(state=>state.user.currentUser.cart)||[];
  let isloggedin=useSelector(state=>state.user.islogedin);
  let total_amount=0;
  for(let i=0;i<cart_items.length;i++){
    total_amount+=cart_items[i].qty*cart_items[i].new_price;
  }
  async function removeFromCart(id){
    let product={...cart_items[id]};
    let result;
      await fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          token:localStorage.getItem('eco-token')
        },
        body:JSON.stringify(product)
      }).then(res=>res.json()).then(data=>result=data)
       dispatch(SetCart(result.cart))
  }
  return (
    (!isloggedin)?
    <div className='cartmsg'><p>Please login to view cart</p></div> :
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>
        {cart_items.map((item,i)=>
        <div >
        <div className="cartitems-format-main cartitems-format">
          <img src={item.image} alt="" className='carticon-product-icon'/>
          <p>{item.name}</p>
          <p>${item.new_price}</p>
          <button className='cartitems-quantity'>{item.qty}</button>
          <p>{item.new_price*item.qty}</p>
          <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={()=>removeFromCart(item.id)}/>
        </div>
        <hr />
        </div>
        )}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${total_amount}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Free</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${total_amount}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have promo code,Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart