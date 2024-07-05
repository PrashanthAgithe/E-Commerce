import React, { useEffect, useState } from 'react'
import './Allproducts.css'
import Product from '../Product/Product'
const Allproducts = () => {
  let [all_product,setall_product]=useState([]);
  async function fetchProduts(){
    await fetch('http://localhost:4000/allproducts')
    .then(res=>res.json())
    .then((data)=>setall_product(data))
  }
  useEffect(()=>{
    fetchProduts()
  },[])
  async function removeProduct(i){
    let product={...all_product[i]};
    let response;
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(product)
    })
    .then(res=>res.json()).then(data=>response=data)
    console.log(response)
    if(response.success){
      alert('Removed');
      let temp_products=[...all_product];
      temp_products.splice(i,1);
      console.log(temp_products);
      setall_product(temp_products);
    }else{
      alert('Not Removed')
    }
  }
  return (
    <div className='allproducts'>
      <h1>All Products</h1>
      <div className='Products-main'>
      {
          all_product.map((item,i)=>
            <div className='allproducts-item'>
             <Product key={i} data={item}/>
             <button onClick={()=>removeProduct(i)}>Remove</button>
            </div>
          )
      }
      </div>
    </div>
  )
}

export default Allproducts