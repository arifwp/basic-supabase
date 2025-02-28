import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Posts from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
