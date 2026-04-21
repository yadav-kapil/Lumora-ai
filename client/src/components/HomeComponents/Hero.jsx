import { ImageUrl } from "../../assets/heroImages";
import { TbArrowGuide } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa";
import { TbBolt, TbShieldCheck } from "react-icons/tb";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="grow flex flex-col justify-center items-center px-6 pt-44 sm:px-10 max-w-7xl mx-auto w-full">
      <button
        className="flex items-center space-x-2 border border-green-600 text-green-600 text-xs rounded-full px-4 pr-1.5 py-1.5 mb-6 hover:bg-green-100 transition-all cursor-pointer"
        type="button"
      >
        <span>Turn your ideas into stunning AI images.</span>
        <span className="flex items-center justify-center size-6 p-1 rounded-full bg-green-600">
          <svg
            width="14"
            height="11"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <h1 className="text-center text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
        Generate stunning images from
        <span className="text-green-600 ml-2">simple text prompts</span>
      </h1>
      <p className="mt-4 text-center text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
        Describe anything you imagine and let our AI instantly transform your words into beautiful, high-quality images.
      </p>
      <Link to='/generate'
        className="mt-8 bg-linear-to-r from-[#05e056] to-[#04aa42] 
        text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium 
        flex items-center space-x-2 
        hover:scale-105 
        shadow-md shadow-green-500/20 hover:shadow-green-500/40
        transition-all duration-500 ease-out cursor-pointer"
        type="button"
      >
        <span>Generate Image</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaRegCreditCard className="text-green-600 text-base" />
          <span>Free Credits</span>
        </div>

        <div className="flex items-center gap-2">
          <TbBolt className="text-green-600 text-base" />
          <span>Fast Generation</span>
        </div>

        <div className="flex items-center gap-2">
          <TbShieldCheck className="text-green-600 text-base" />
          <span>Secure & Private</span>
        </div>
      </div>

      <div
        aria-label="Photos of leaders"
        className="mt-18 grid grid-cols-2 lg:grid-cols-4 
  gap-x-8 lg:gap-x-12 gap-y-10 
  max-w-5xl w-full mx-auto pb-10"
      >
        {ImageUrl.map((img, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.prompt}
              className="w-full aspect-square object-cover rounded-xl
        transition duration-300
        group-hover:-translate-y-1 group-hover:scale-[1.02]"
            />

            <TbArrowGuide
              size={20}
              className="my-3 text-gray-400 rotate-90 
        group-hover:text-green-500 max-md:text-green-500 transition"
            />

            <p
              className="text-sm text-gray-600 leading-relaxed
        max-w-[90%]
        group-hover:text-gray-900 transition-all border border-gray-200 px-2 py-1 rounded-lg"
            >
              {img.prompt}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Hero;
