import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Product from '../Product/Product'
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {
          data_product.map((item,i)=>
            <Product key={i} data={item}/>
          )
        }
      </div>
    </div>
  )
}

export default RelatedProducts