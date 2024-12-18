import { Link } from "react-router-dom";
import { Home, ShoppingCart, ShoppingBag, UserPlus, LogIn } from "lucide-react"; // Import icons from lucide-react
import useEcomStore from "../store/ecomerce-store";

const Mainnav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  return (
    <nav className="bg-secondary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left side links */}
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-primary text-xl font-bold">
              LOGO
            </Link>
            <Link
              to={"/"}
              className="btn btn-accent flex items-center gap-2 shadow-md"
            >
              <Home className="w-5 h-5" /> Home
            </Link>
            <Link
              to={"shop"}
              className="btn btn-accent flex items-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-5 h-5" /> Shop
            </Link>
            <Link
              to={"cart"}
              className="btn btn-accent flex items-center gap-2 shadow-md"
            >
              <div className="indicator">
                {carts.length > 0 && (
                  <span className="indicator-item badge badge-secondary badge-xs">
                    {carts.length}
                  </span>
                )}

                <ShoppingCart className="w-5 h-5" />
              </div>
              Cart
            </Link>
          </div>

          {/* Right side links */}
          <div className="flex items-center gap-4">
            <Link
              to={"register"}
              className="btn btn-accent flex items-center gap-2 shadow-md"
            >
              <UserPlus className="w-5 h-5" /> Register
            </Link>
            <Link
              to={"login"}
              className="btn btn-accent flex items-center gap-2 shadow-md"
            >
              <LogIn className="w-5 h-5" /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Mainnav;
