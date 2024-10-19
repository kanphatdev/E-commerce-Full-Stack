import { Link, Outlet } from "react-router-dom";
import { Home, Package, List, Settings } from "lucide-react"; // Import icons from lucide-react

const AdminLayout = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Admin Dashboard</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu links */}
              <li>
                <Link to="/admin">
                  <Home className="mr-2 h-5 w-5" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/product">
                  <Package className="mr-2 h-5 w-5" /> Products
                </Link>
              </li>
              <li>
                <Link to="/admin/category">
                  <List className="mr-2 h-5 w-5" /> Categories
                </Link>
              </li>
              <li>
                <Link to="/admin/manage">
                  <Settings className="mr-2 h-5 w-5" /> Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content */}
          <li>
            <Link to="/admin">
              <Home className="mr-2 h-5 w-5" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/product">
              <Package className="mr-2 h-5 w-5" /> Products
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <List className="mr-2 h-5 w-5" /> Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/manage">
              <Settings className="mr-2 h-5 w-5" /> Manage
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
