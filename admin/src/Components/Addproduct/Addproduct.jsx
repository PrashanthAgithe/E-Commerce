import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'
const Addproduct = () => {
  let [image,setimage]=useState(false);
  let [productDetails,setproductDetails]=useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:""
  })
  function producthandler(e){
    setproductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  function imagehandler(e){
    setimage(e.target.files[0]);
  }
  async function addproduct(){
    let responsedata;
    let product={...productDetails};
    
    let formData=new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method:"POST",
      headers:{
        Accept:'application/json',
      },
      body:formData
    }).then((resp)=>resp.json()).then((data)=>{responsedata=data})

    if(responsedata.success){
      product.image=responsedata.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((res=>res.json())).then((data)=>{
        if(data.success){
          alert('Product Added');
        }else{
          alert('Failed');
        }
      })
    }
  }
  return (
    <div className='addproduct'>
      <div className="addproduct-fields">
        <p>Product title</p>
        <input value={productDetails.name} onChange={producthandler} type="text" name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-fields">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={producthandler}type="text" name='old_price' placeholder='Type here'/>
        </div>
        <div className="addproduct-fields">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={producthandler}type="text" name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-fields">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={producthandler}name="category" className='addproduct-selector'>
          <option value="" disabled>select</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
          <option value="men">Men</option>
        </select>
      </div>
      <div className="addproduct-fields">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className="uploading-img" alt="" />
        </label>
        <input onChange={imagehandler} type="file" name="image" id="file-input" hidden/>
      </div>
      <button onClick={addproduct} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct