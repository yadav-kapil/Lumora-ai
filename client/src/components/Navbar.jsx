import { useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = ({showBanner}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className={`px-2 relative md:px-4 w-full ${showBanner ? "mt-1" : "mt-4"}`}>
      <nav className="flex items-center justify-between px-6 py-1 md:py-2 shadow-sm max-w-5xl rounded-full mx-auto w-full bg-white/50 border border-gray-300/20 md:backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 select-none">
          <div className="px-1.5 py-1 rounded-lg bg-green-100">
            <BiImageAlt className="text-green-600 text-lg" />
          </div>
          <div className="flex gap-0.5">
            <span className="text-gray-900 font-semibold text-lg tracking-tight">
              Lumora
            </span>
            <span className="text-green-600 font-semibold text-lg">.ai</span>
          </div>
        </Link>

        <div
          id="menu"
          className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-full ${
            isSidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
          } transition-transform duration-300 max-md:bg-white/50 max-md:backdrop-blur-lg flex flex-col md:flex-row gap-8 text-gray-900 text-sm font-normal max-md:z-50`}
        >
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-green-600 relative overflow-hidden group h-6"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Home
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              Home
            </span>
          </Link>

          <Link
            to="/generate"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-green-600 relative overflow-hidden group h-6"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Generate
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              Generate
            </span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-green-600 relative overflow-hidden group h-6"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Contact
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              Contact
            </span>
          </Link>

          <Link
            to="/pricing"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-green-600 relative overflow-hidden group h-6"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Pricing
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              Pricing
            </span>
          </Link>

          {isSidebarOpen && (
            <button
              id="closeMenu"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-600 border border-slate-300 rounded-md px-1 py-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="max-md:hidden flex px-3 py-1 hover:bg-gray-200 transition border border-slate-300 rounded-full"
          >
            Get Started
          </Link>

          <Link
            to="/signup"
            className="hidden sm:flex 
            px-3 py-1.5 rounded-full text-sm font-medium text-white
            
            bg-linear-to-r from-[#22c55e] to-[#16a34a]
            border border-slate-300
            
            shadow-sm shadow-black/5
            hover:shadow-md hover:shadow-black/10
            
            hover:from-[#16a34a] hover:to-[#15803d]
            
            transition-all duration-300"
          >
            Sign up
          </Link>

          <button
            id="openMenu"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-600 border border-slate-300 rounded-md px-1 py-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
