import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Posts from "./pages/Posts";
import UserRoute from "./middlewares/UserRoute";

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
        element: (
          <UserRoute>
            <Posts />
          </UserRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
