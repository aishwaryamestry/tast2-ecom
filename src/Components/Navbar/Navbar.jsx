import { FiShoppingBag } from "react-icons/fi";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "./Darkmode";

const Navbar = () => {
  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/20 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link to="/" className="font-bold text-xl flex items-center gap-1">
              <FiShoppingBag size="30" />
              Shop Me
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-primary focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              Products
            </NavLink>
            {/* Added Checkout Link */}
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              Checkout
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              <span
                className=" bg-gradient-to-t from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3 group"
                aria-label="View Orders"
              >
                <span className="group-hover:block hidden transition-all">
                  Wishlist
                </span>
                <FaHeart className="text-xl" />
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              <span
                className="bg-gradient-to-t from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3 group"
                aria-label="View Orders"
              >
                <span className="group-hover:block hidden transition-all">
                  Order
                </span>
                <FaCartShopping className="text-xl" />
              </span>
            </NavLink>
          </div>

          <DarkMode />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
