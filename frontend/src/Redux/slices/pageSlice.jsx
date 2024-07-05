import { createSlice } from "@reduxjs/toolkit";

export const pageSlice=createSlice({
  name:'page',
  initialState:{
    page:'home'
  },
  reducers:{
    setpage:(state,action)=>{
      state.page=action.payload;
    }
  }
})
export const {setpage}=pageSlice.actions
export default pageSlice.reducer