import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/signup/Signup.tsx'
import Home from './pages/main/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <App/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
