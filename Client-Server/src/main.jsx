import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter , RouterProvider} from 'react-router'
import store from './store/store.js'
import { Provider } from 'react-redux'

import {UnAuthLayout , AuthLayout} from './layout/index.js'
import { Home , About , Login , Register , Dashboard } from './pages/index.js'

const router  = createBrowserRouter([
  {
    path: "",
    element: <UnAuthLayout /> ,
    children:[
      {
        path : "/",
        element : <Home/>
      } , 
      {
        path : "/about",
        element : <About />
      } , 
      {
        path :  "/login",
        element : <Login />
      },
      {
        path : '/register',
        element : <Register />
      }
    ]
  },
  {
    path: "/GradWise",
    element: <AuthLayout/>,
    children : [
      {
        path:"/GradWise/dashboard",
        element: <Dashboard />
      }
    ]
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    
    </Provider>
  </StrictMode>,
)
