import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/signup/Signup.tsx'
import Home from './pages/main/Home.tsx'
import Favorite from './pages/favorite/Favorite.tsx'
import Playlist from './pages//playlist/Playlist.tsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/favorite",
    element: <Favorite theme={'light'}/>,
  },
  {
    path: "/add",
    element: <Home />,
  },
  {
    path: "/playlist",
    element: <Playlist theme={'light'}  />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
