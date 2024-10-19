import { Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, LogIn, UserPlus } from "lucide-react";

const MainNavigation = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start gap-4">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <Home className="mr-2" /> daisyUI
        </Link>
        <Link to={"/"} className="btn capitalize">
          <Home className="mr-2" /> home
        </Link>
        <Link to={"/shop"} className="btn capitalize">
          <ShoppingBag className="mr-2" /> shop
        </Link>
        <Link to={"/cart"} className="btn capitalize">
          <ShoppingCart className="mr-2" /> cart
        </Link>
      </div>

      <div className="navbar-end gap-4">
        <Link to={"/login"} className="btn capitalize">
          <LogIn className="mr-2" /> login
        </Link>
        <Link to={"/register"} className="btn capitalize">
          <UserPlus className="mr-2" /> register
        </Link>
      </div>
    </div>
  );
};

export default MainNavigation;
