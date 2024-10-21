import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import Category from "../pages/admin/Category";
import LayoutUser from "../layouts/LayoutUser";
import Manage from "../pages/admin/Manage";
import HomeUser from "../pages/user/HomeUser";
import ProtectedRouteUser from "./ProtectedRoute";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import FormCategory from "../components/admin/FormCategory";
import FormProduct from "../components/admin/FormProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Public layout
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRouteAdmin element={<AdminLayout />} />, // Protected admin routes
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "category", element: <Category /> },
      { path: "manage", element: <Manage /> },
      { path: "add-category", element: <FormCategory /> },
      { path: "add-product", element: <FormProduct /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRouteUser element={<LayoutUser />} />, // Protected user layout
    children: [
      { index: true, element: <HomeUser /> },
    ],
  },
  {path: "add-category", element: <FormCategory />}
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
