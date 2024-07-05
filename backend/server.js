const port=4000;
const exp=require('express')
const app=exp();
//extract body of req 
app.use(exp.json())

const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

app.use(cors());
const mongoose=require('mongoose');
const { type } = require('os');

// const mc=require('mongodb').MongoClient
mongoose.connect('mongodb+srv://PRASHANTH:prashanth1986@cluster0.dn5olk2.mongodb.net/e-commerce').then(()=>console.log("DB connected"))

//sample route
app.get('/',(req,res)=>{
  res.send('express app is running')
})

//image storage engine
const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({storage:storage})

//creating upload
app.use('/images',exp.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})

//schema for creating products
const Product=mongoose.model('Product',{
  id:{
    type:Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true,
  },
})

app.post('/addproduct',async(req,res)=>{
  let products=await Product.find({});
  let id=1;
  if(products.length>0){
    id=products[products.length -1].id +1; 
  }
  const product=new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  })
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success:true,
    name:req.body.name,
  })
})

//route for deleting product

app.post('/removeproduct',async(req,res)=>{
  await Product.deleteOne({id:req.body.id})
  console.log('removed');
  res.json({
    success:true,
    name:req.body.name
  })
})

//route for getting all products
app.get('/allproducts',async(req,res)=>{
  let all_products=await Product.find({});
  res.send(all_products)
})

//schema for users
const Users=mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
  },
  cart:{
    type:Object,
    default:[],
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

//route for User registration
app.post('/signup',async(req,res)=>{
  let check=await Users.findOne({email:req.body.email});
  if(!check){
    const user= new Users({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    })
    await user.save();
    const data={
      user:{
        id:user.id
      }
    }
    const token=jwt.sign(data,'secrete_key');
    res.json({
      success:true,
      token:token
    })
  }else{
    res.json({
      success:false,
      error:'User already exist',
    })
  }
})

//route for user login
app.post('/login',async(req,res)=>{
  let dbuser=await Users.findOne({email:req.body.email})
  if(dbuser){
    if(dbuser.password===req.body.password){
      const data={
        user:{
          id:dbuser.id
        }
      }
      const token=jwt.sign(data,'secrete_key');
      res.json({
        success:true,
        token:token,
        name:dbuser.name,
        email:dbuser.email,
        cart:dbuser.cart
      })
    }else{
      res.json({
        success:false,
        error:"Incorrect password"
      })
    }
  }else{
    res.json({
      success:false,
      error:"Uesr does not exist"
    })
  }
})
const verifyUser=async (req,res,next)=>{
  let token=req.headers.token;
  if(token){
    try{
      let result=jwt.verify(token,'secrete_key')
      req.user=result.user;
      next()
    }catch(err){
      next(err)
    }
  }else{
    return res.json({message:'Plz login to continue'})
  }
}
//route for adding product to cart
app.post('/addtocart',verifyUser,async(req,res)=>{
  let dbuser=await Users.findOne({_id:req.user.id}) 
  let cartdata=dbuser.cart;
  let idx=cartdata.findIndex((p)=>p.id===req.body.id);
  if(idx===-1)
    cartdata.splice(cartdata.length-1,0,req.body);
  else{
    cartdata[idx].qty+=req.body.qty;
  }
  let result=await Users.updateOne({_id:req.user.id},{cart:cartdata});
  dbuser=await Users.findOne({_id:req.user.id}) 
  cartdata=dbuser.cart;
  res.json({success:result.acknowledged,cart:cartdata});
})
//route for adding product to cart
app.post('/removefromcart',verifyUser,async(req,res)=>{
  let dbuser=await Users.findOne({_id:req.user.id}) 
  let cartdata=dbuser.cart;
  let idx=cartdata.findIndex((p)=>p.id===req.body.id);
  cartdata.splice(idx,1);
  let result=await Users.updateOne({_id:req.user.id},{cart:cartdata});
  dbuser=await Users.findOne({_id:req.user.id}) 
  cartdata=dbuser.cart;
  res.json({success:result.acknowledged,cart:cartdata});
})
//error handling
app.use((err,req,res,next)=>{
  res.send({message:'error',payload:err.message})
})
//assigning port number
app.listen(port,()=>console.log('server on port '+port))