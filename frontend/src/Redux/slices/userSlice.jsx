import {createSlice} from '@reduxjs/toolkit'

export const userSlice=createSlice({
  name:'user',
  initialState:{
    isPending:false,
    islogedin:false,
    currentUser:{
      cart:[]
    },
    errorOccurred:false,
    errMsg:''
  },
  reducers:{
    resetState:(state,action)=>{
      state.isPending=false;
      state.islogedin=false;
      state.currentUser={
        cart:[]
      };
      state.errorOccurred=false;
      state.errMsg='';
    },
    setLoggedin:(state,action)=>{
      state.islogedin=true;
      state.currentUser=action.payload;
      console.log(state.currentUser);
    },
    SetCart:(state,action)=>{
      state.currentUser.cart=action.payload;
    }
  }
})
export const {resetState,setLoggedin,SetCart}=userSlice.actions
export default userSlice.reducer