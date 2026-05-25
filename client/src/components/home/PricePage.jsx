import { NavLink } from "react-router-dom";
import { TfiControlPlay } from "react-icons/tfi";
import { priceList } from "../../data/pricingList";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import cross from "../../assets/svg/cross.svg";
import { motion } from "motion/react";

const PricePage = () => {
  const [activeBox, setActiveBox] = useState(1);
  return (
    <div className="flex flex-col items-center px-6 sm:px-18 mt-12 max-w-7xl mx-auto w-full">
      <div className="w-5/6 h-0.75 bg-linear-to-r from-white via-[#05e056] via-[#04aa42] via-[#05e056] to-white"></div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-black font-semibold my-6 text-2xl sm:text-3xl md:text-4xl max-w-2xl leading-tight"
      >
        Pick a <span className="text-green-600">Flexible Plan</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <NavLink
          to="/pricing"
          className="bg-linear-to-r from-[#05e056] to-[#04aa42] 
          text-white px-3 py-2.5 pl-4 mb-10 rounded-full text-sm font-medium 
          flex justify-center items-center space-x-2 
          hover:scale-105 
          shadow-md shadow-green-500/20 hover:shadow-green-500/40
          transition-all duration-500 ease-out cursor-pointer"
        >
          <span>Subscribe Now</span>
          <TfiControlPlay className="text-white" />
        </NavLink>
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 mx-auto gap-6 mb-16">
        {priceList.map((list, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveBox(index)}
              onMouseLeave={() => setActiveBox(1)}
              className={`py-6 px-4 rounded-4xl bg-[#3e3d3d] flex flex-col gap-4 w-full md:w-3/4 md:mx-auto lg:w-full transition-transform duration-500 cursor-pointer border-2 border-green-500 ${index == activeBox && "lg:scale-[1.07] shadow-[0_0_12px_rgba(34,197,94,0.25),0_0_24px_rgba(34,197,94,0.2)]"}`}
            >
              <div className="flex justify-between items-center px-3">
                <h1 className="text-white font-normal text-2xl md:text-3xl leading-tight">
                  {list.type}
                </h1>
                {list.tag && (
                  <p
                    className="bg-linear-to-r from-[#05e056] to-[#04aa42] text-white px-2 py-2 pl-2 h-5/6 rounded-full text-xs font-extralight 
                    flex justify-center items-center gap-2 
                    hover:scale-105 
                    shadow-md shadow-green-500/20 hover:shadow-green-500/40
                    transition-all duration-500 ease-out cursor-default"
                  >
                    <BsLightningChargeFill className="text-white" />
                    <span>Most Popular</span>
                  </p>
                )}
              </div>
              <p className="flex justify-start items-end gap-1 px-3">
                <span className="text-white text-2xl font-light">{`${list.price}$`}</span>
                <span className="text-gray-400 font-extralight">/mon</span>
              </p>
              <p className="text-white font-light px-3">{list.imgNoText}</p>
              <div className="flex flex-col gap-3 mt-2 justify-center items-center w-full">
                <button className="flex gap-3 justify-start items-center text-xs text-light px-4 py-2 text-white bg-transparent hover:bg-gray-200 hover:text-black transition-all border border-slate-300 rounded-full w-3/4 cursor-pointer">
                  <FaCoins />
                  <span>{list.credits}</span>
                </button>
                <button
                  className="bg-linear-to-r from-[#05e056] to-[#04aa42] text-white px-2 py-2 pl-2 w-3/4 rounded-full text-xs font-medium 
                    flex justify-center items-center gap-2 
                    hover:scale-105 
                    shadow-md shadow-green-500/20 hover:shadow-green-500/40
                    transition-all duration-500 ease-out cursor-pointer"
                >
                  {list.button}
                </button>
              </div>
              <div className="flex flex-col gap-3 w-11/12 mx-auto px-5 py-4 rounded-2xl bg-[#5b5b5b]/80 backdrop-blur-sm">
                {list.features.map((feature, i) => {
                  return (
                    <div key={i} className="flex items-start gap-3">
                      {/* ICON */}
                      <div
                        className=" flex items-center justify-center w-5 h-5 rounded-full 
                      bg-white/10 border border-white/20 aspect-square"
                      >
                        {feature.icon === "tick" ? (
                          <TiTick className="text-green-400 text-sm" />
                        ) : (
                          <img
                            src={cross}
                            className="w-3 h-3 opacity-60"
                            alt="not available"
                          />
                        )}
                      </div>

                      {/* TEXT */}
                      <p
                        className={`text-sm font-light ${
                          feature.icon === "wrong"
                            ? "text-gray-400"
                            : "text-white/90"
                        }`}
                      >
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PricePage;
