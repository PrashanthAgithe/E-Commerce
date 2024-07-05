import {configureStore} from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice'
import pageReducer from './slices/pageSlice'
import productReducer from './slices/productSlice'
const persistConfig={
  key:'userpersist',
  storage
}
const persisteduserReducer=persistReducer(persistConfig,userReducer);
export const store=configureStore({
  reducer:{
    user:persisteduserReducer,
    page:pageReducer,
    products:productReducer
  }
})

export const persistor=persistStore(store)