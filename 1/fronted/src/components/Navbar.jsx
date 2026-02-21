import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-4 mb-8 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-sm">
      <NavLink
        className={({ isActive }) =>
          `px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
        to="/sign-in"
      >
        Sign In
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
        to="/sign-up"
      >
        Sign Up
      </NavLink>
    </nav>
  );
};

export default Navbar;
