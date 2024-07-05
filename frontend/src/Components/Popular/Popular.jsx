import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Product from '../Product/Product'
const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-items">
        {
          data_product.map((item,i)=>
            <Product key={i} data={item} />
          )
        }
      </div>
    </div>
  )
}

export default Popular