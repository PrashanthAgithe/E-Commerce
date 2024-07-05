import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import ErrorLayout from './Components/ErrorLayout/ErrorLayout';
import Addproduct from './Components/Addproduct/Addproduct';
import Allproducts from './Components/Allproducts/Allproducts';
const App = () => {
  let router=createBrowserRouter([
    {
      path:'',
      element:<Admin />,
      errorElement:<ErrorLayout />,
      children:[
        {
          path:'',
          element:<Addproduct />
        },
        {
          path:'addproduct',
          element:<Addproduct />
        },
        {
          path:'allproduct',
          element:<Allproducts />
        }
      ]
    }
  ])
  return (
    <div className='app'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App