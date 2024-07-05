
import './App.css';
import Cart from './Components/Cart/Cart';
import Category from './Components/Category/Category';
import ErrorLayout from './Components/ErrorLayout/ErrorLayout';
import Home from './Components/Home/Home';
import LoginAndRegister from './Components/LoginAndRegister/LoginAndRegister';
import Productpage from './Components/Productpage/Productpage';
import RouteLayout from './Components/RouteLayout/RouteLayout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {

  let router=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout/>,
      errorElement:<ErrorLayout />,
      children:[
        {
          path:'',
          element:<Home /> 
          
        },
        {
          path:'mens',
          element:<Category category='men' />
        },
        {
          path:'womens',
          element:<Category category='women' />
        },
        {
          path:'kids',
          element:<Category category='kid' />
        },
        {
          path:'login',
          element:<LoginAndRegister />
        },
        {
          path:'cart',
          element:<Cart />
        },
        {
          path:'product/:productId',
          element:<Productpage />
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
