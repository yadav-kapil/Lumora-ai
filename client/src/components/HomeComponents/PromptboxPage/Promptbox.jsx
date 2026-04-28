import { FaPlus } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import prompt1Img from "../../../assets/promptboxImg/prompt1.jpg";
import prompt2Img from "../../../assets/promptboxImg/prompt2.jpg";
import prompt3Img from "../../../assets/promptboxImg/prompt3.jpg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Promptbox = () => {
  const [lineglow, setLineglow] = useState(0);
  const prompts = [
    "Describe any visual idea. Lumora will help you visualise into reality.",
    "Turn your imagination into stunning visuals with just a few words.",
    "From simple thoughts to breathtaking creations—start with a prompt.",
    "Bring your ideas to life instantly using the power of AI.",
  ];

  const [prompt, setPrompt] = useState(prompts[0]);
  const [promptText, setPromptText] = useState("");

  const [mobPrompt, setMobPrompt] = useState(2);
  const promptImages = [prompt1Img, prompt2Img, prompt3Img];

  useEffect(() => {
    let i = 0;
    let currentText = "";
    setPromptText("");
    const interval = setInterval(() => {
      if (i < prompt.length) {
        currentText += prompt.charAt(i);
        setPromptText(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [prompt]);

  return (
    <div className="flex flex-col items-center px-6 sm:px-18 py-16 lg:py-18 max-w-7xl mx-auto w-full">
      <h1 className="text-center font-semibold text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
        <p>
          <span className="text-black mr-2">From</span>
          <span className="text-green-600 mr-2">Prompts</span>
          <span className="text-black mr-2">to</span>
          <span className="text-green-600">Magic</span>
        </p>
      </h1>
      <section className="flex max-lg:flex-col lg:gap-16 justify-start max-lg:items-center w-full mt-10 z-0">
        <div className="leftImg flex flex-col flex-1 w-full lg:flex-4">
          <div
            className={`promptbox w-full flex flex-col justify-between max-lg:min-h-38 border-2 border-green-500 rounded-2xl bg-gray-800 cursor-pointer z-10 transition-all duration-500 ${lineglow && "shadow-lg shadow-green-500/20"}`}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={prompt}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.1,
                }}
                className="text-white px-4 font-extralight py-1 mb-8 tracking-wide"
              >
                {promptText}
              </motion.p>
            </AnimatePresence>
            <div className="w-full flex justify-between items-center">
              <div className="px-3 py-3 flex justify-center items-center gap-3 text-white">
                <FaPlus
                  size={32}
                  className="rounded-full bg-gray-600 px-2 py-2"
                />
                <span className="flex gap-2 rounded-full bg-gray-600 px-3 py-1 justify-center items-center">
                  <FaTools size={16} />
                  <p className="font-extralight">Customise</p>
                </span>
              </div>
              <div className="px-3 mt-3 justify-end items-center">
                <RiSendPlaneFill size={20} className="text-white" />
              </div>
            </div>
          </div>
          <div className="hidden relative lg:flex flex-col justify-end items-center w-full mt-20">
            <img
              src={prompt1Img}
              alt="prompt1"
              onMouseEnter={() => {
                setLineglow(1);
                setPrompt(prompts[1]);
              }}
              onMouseLeave={() => {
                setLineglow(0);
                setPrompt(prompts[0]);
              }}
              className="w-1/2 object-cover rounded-3xl cursor-pointer transition-all translate-x-10/12 translate-y-18 z-10 hover:scale-[1.02] duration-700"
            />
            <img
              src={prompt2Img}
              onMouseEnter={() => {
                setLineglow(2);
                setPrompt(prompts[2]);
              }}
              onMouseLeave={() => {
                setLineglow(0);
                setPrompt(prompts[0]);
              }}
              alt="prompt1"
              className="w-1/2 object-cover cursor-pointer rounded-3xl z-9 hover:z-20 transition-all hover:scale-[1.02] duration-700"
            />
            <div
              className={`absolute -top-24 right-1/2 w-0.5 h-4/5 bg-green-500 transition-all duration-500 ${lineglow == 2 && "shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e]"}`}
            >
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 h-full"
                initial={{ y: 0 }}
                animate={{ y: ["0%", "90%"] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              >
                <IoIosArrowDown size={24} className="text-green-600" />
              </motion.div>
            </div>
            <div
              className={`absolute -top-24 right-1/5 w-0.5 h-3/5 bg-green-500 transition-all duration-500 ${lineglow == 1 && "shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e]"}`}
            >
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 h-full"
                initial={{ y: 0 }}
                animate={{ y: ["0%", "50%"] }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              >
                <IoIosArrowDown size={24} className="text-green-600" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="rightImg relative hidden lg:flex lg:flex-2 w-full rounded-lg justify-center items-start">
          <img
            src={prompt3Img}
            alt="prompt3"
            onMouseEnter={() => {
              setLineglow(3);
              setPrompt(prompts[3]);
            }}
            onMouseLeave={() => {
              setLineglow(0);
              setPrompt(prompts[0]);
            }}
            className="w-full rounded-3xl cursor-pointer z-9 hover:z-20 hover:scale-[1.02] transition-all duration-700"
          />
          <div
            className={`absolute -left-1/3 top-1/12 w-1/2 h-0.5 bg-green-500 ${lineglow == 3 && "shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e]"}`}
          >
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full"
              initial={{ x: "0%" }}
              animate={{ x: ["10%", "70%"] }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            >
              <IoIosArrowForward size={24} className="text-green-600" />
            </motion.div>
          </div>
        </div>

        {/* MOBILE SECTION */}
        <div className="relative w-0.5 flex z-2 h-30 lg:hidden bg-green-500 shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e]">
          <motion.div
            className="absolute h-full left-1/2 -translate-x-1/2"
            initial={{ y: 0 }}
            animate={{ y: ["0%", "88%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          >
            <IoIosArrowDown size={24} className="text-green-600" />
          </motion.div>
        </div>
        <motion.div
          key={mobPrompt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden w-full aspect-square flex px-1.5 py-1.5 justify-center items-center z-20 border border-green-600 rounded-2xl bg-linear-to-br from-gray-300 via-gray-100 to-gray-200 min-h-[90vw]"
>
          <img
            src={promptImages[mobPrompt - 1]}
            alt="promptImg"
            className="w-full h-full rounded-2xl transition-all"
          ></img>
        </motion.div>

        {/* ARROW BAR */}
        <div className="lg:hidden w-full h-auto flex justify-center items-center gap-3 mt-4">
          {/* ⬅ Prev */}
          <button
            onClick={() => {
              if (mobPrompt > 1) {
                setMobPrompt((prev) => prev - 1);
              } else {
                setMobPrompt(3);
              }
            }}
            className="h-full px-1.5 py-1.5 flex justify-center items-center 
    rounded-full 
    bg-[#1a1a1a] 
    border border-white/10 
    shadow-[0_2px_8px_rgba(0,0,0,0.6)] 
    transition-all
    active:bg-green-500"
          >
            <GrLinkPrevious size={22} className="text-white/80" />
          </button>

          {/* ⚪ Indicators */}
          <div
            className="h-8 px-4 flex justify-center items-center 
    rounded-full 
    bg-[#121212] 
    border border-white/10 
    shadow-inner 
    gap-1"
          >
            <div className="flex gap-2 justify-center items-center">
              <span
                className={`${
                  mobPrompt === 1
                    ? "w-8 bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.7)]"
                    : "w-2 bg-white/20"
                } 
          h-2 rounded-full transition-all duration-500`}
              ></span>

              <span
                className={`${
                  mobPrompt === 2
                    ? "w-8 bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.7)]"
                    : "w-2 bg-white/20"
                } 
          h-2 rounded-full transition-all duration-500`}
              ></span>

              <span
                className={`${
                  mobPrompt === 3
                    ? "w-8 bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.7)]"
                    : "w-2 bg-white/20"
                } 
          h-2 rounded-full transition-all duration-500`}
              ></span>
            </div>
          </div>

          {/* ➡ Next */}
          <button
            onClick={async () => {
              if (mobPrompt < 3) {
                await setMobPrompt((prev) => prev + 1);
              } else {
                await setMobPrompt(1);
              }
              setPrompt(prompts[mobPrompt]);
            }}
            className="h-full px-1.5 py-1.5 flex justify-center items-center 
    rounded-full 
    bg-[#1a1a1a] 
    border border-white/10 
    shadow-[0_2px_8px_rgba(0,0,0,0.6)] 
    active:bg-green-500
    transition-all"
          >
            <GrLinkNext size={22} className="text-white/80" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Promptbox;
