import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

export default function Error404() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center text-sm h-100 text-center">
        <p className="font-medium text-lg text-green-500 tracking-wide">
          404 Error
        </p>

        <h2 className="md:text-6xl text-4xl font-semibold text-gray-800 mt-1">
          Page Not Found
        </h2>

        <p className="text-base mt-4 text-gray-500 max-w-md">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 cursor-pointer px-7 py-2.5 text-white rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Go back home
          </Link>

          <Link
            to="/contact"
            className="group flex items-center gap-2 px-7 py-2.5 cursor-pointer rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200"
          >
            <span className="text-gray-700 group-hover:text-gray-900">
              Contact support
            </span>

            <svg
              className="group-hover:translate-x-1 transition-transform duration-200"
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
            >
              <path
                d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
