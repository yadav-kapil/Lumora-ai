const Banner = ({ setShowBanner }) => {
  return (
    <div className="w-full py-1.5 font-medium text-sm text-green-800 
    flex justify-center items-center gap-2 bg-linear-to-r from-[#ABFF7E] to-[#FDFEFF] relative">

      <span className="px-3 py-1 rounded-lg text-white bg-green-600">
        50% off
      </span>

      <span>Grab Now !!</span>

      
      <button
        onClick={() => setShowBanner(false)}
        className="absolute right-4 text-green-800 hover:text-black hover:scale-110 transition border border-slate-300 rounded-md px-2 py-1 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};

export default Banner;