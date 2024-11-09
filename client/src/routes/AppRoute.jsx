import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Checkout from "../pages/Checkout";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LayoutAdmin from "../layout/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import LayoutUser from "../layout/LayoutUser";
import HomeUser from "../pages/users/HomeUser";
import History from "../pages/History";
import EditProduct from "../pages/admin/EditProduct";
import Manage from "../pages/admin/Manage";
import ManageOrders from "../pages/admin/ManageOrders";
import ProtectedRouteUser from "./ProtectedRouteUser";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import Product from "../pages/admin/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRouteAdmin element={<LayoutAdmin />} />, // Protected admin routes
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "category", element: <Category /> },
      { path: 'product/:id', element: <EditProduct/> },
      { path: 'manage', element: <Manage /> },
      { path: 'orders', element: <ManageOrders /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRouteUser element={<LayoutUser/>}  />,
   
    children: [
      { index: true, element: <HomeUser /> },
      { path: "history", element: <History /> },
    ],
  },
]);

const AppRoute = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoute;
