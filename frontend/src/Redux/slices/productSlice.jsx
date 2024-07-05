import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const productsThunk=createAsyncThunk('productsthunk',async(thunkapi)=>{
  try{
    let result;
    await fetch('http://localhost:4000/allproducts')
    .then(res=>res.json()).then(data=>result=data);
    return result;
  }catch(err){
    return thunkapi.rejectWithValue(err);
  }
})
export const productSlice=createSlice({
  name:'products',
  initialState:{
    isPending:false,
    products:[],
  },
  reducers:{

  },
  extraReducers: builder=>builder
  .addCase(productsThunk.pending,(state,action)=>{
    state.isPending=true;
  })
  .addCase(productsThunk.fulfilled,(state,action)=>{
    state.isPending=false;
    state.products=action.payload;
  })
  .addCase(productsThunk.rejected,(state,action)=>{
    state.isPending=false;
  })
})

export default productSlice.reducer;