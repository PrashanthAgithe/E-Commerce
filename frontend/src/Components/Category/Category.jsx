import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Category.css'
// import all_product from '../Assets/all_product'
import { productsThunk } from '../../Redux/slices/productSlice'
import banner_kids from '../Assets/banner_kids.png'
import banner_mens from '../Assets/banner_mens.png'
import banner_womens from '../Assets/banner_women.png'
import dropdown_icon from '../Assets/dropdown_icon.png'
import Product from '../Product/Product'
import { setpage } from '../../Redux/slices/pageSlice'
const Category = (props) => {
  let dispatch=useDispatch()
  dispatch(setpage(props.category))
  useEffect(()=>{
    dispatch(productsThunk());
  },[])
  let all_product=useSelector(state=>state.products.products);
  return (
    <div className="category">
      {
        (props.category==='kid')?
          <img className='banner' src={banner_kids} alt="" />:
          (props.category==='men')?
          <img className='banner' src={banner_mens} alt="" />:
          <img className='banner' src={banner_womens} alt="" />
      }
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
        Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {
          all_product.map((item,i)=>
            (item.category===props.category) && <Product key={i} data={item}/>
          )
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default Category