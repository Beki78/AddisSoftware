import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/signup/Signup.tsx'
import Home from './pages/main/Home.tsx'
import Favorite from './pages/favorite/Favorite.tsx'
import Playlist from './pages//playlist/Playlist.tsx'
import { Provider } from 'react-redux'
import  store  from './app/store.ts'

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
    path: "/",
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

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <RouterProvider router={router} />
    
  </Provider>
);
