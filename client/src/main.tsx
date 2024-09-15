import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/main/Home.tsx";
import Playlist from "./pages//playlist/Playlist.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

const router = createBrowserRouter([
 

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/add",
    element: <Home />,
  },
  {
    path: "/playlist",
    element: <Playlist theme={"light"} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
