import React from 'react'
import './NewCollections.css'
import new_collections from '../Assets/new_collections'
import Product from '../Product/Product'
const NewCollections = () => {
  return (
    <div className='newcollections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {
          new_collections.map((item,i)=>
            <Product key={i} data={item}/>
          )
        }
      </div>
    </div>
  )
}

export default NewCollections