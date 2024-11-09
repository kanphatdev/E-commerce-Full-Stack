import { NavLink } from "react-router-dom";
import { Home, Settings, Grid, Package, ShoppingBag, LogOut } from "lucide-react";

const Adminsidebar = () => {
  return (
    <div className="bg-success text-base-100 w-64 flex flex-col h-screen">
      <div className="h-24 bg-emerald-300 flex items-center justify-center text-2xl font-bold capitalize">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
          end
        >
          <Grid />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
        >
          <Settings />
          <span>Manage</span>
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
        >
          <Package />
          <span>Category</span>
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
        >
          <ShoppingBag />
          <span>Product</span>
        </NavLink>
        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
        >
          <Home />
          <span>Orders</span>
        </NavLink>
      </nav>
      <div className="px-4 py-2">
        <NavLink
          to={"/logout"}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-400 ${
              isActive ? "bg-emerald-500" : ""
            }`
          }
        >
          <LogOut />
          <span>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Adminsidebar;
