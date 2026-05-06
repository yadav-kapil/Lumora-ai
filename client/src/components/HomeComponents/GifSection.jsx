import gif from "../../assets/gif/animation.gif";
import bg from "../../assets/bgImages/testgrid.png";
import { motion } from "motion/react";

const GifSection = () => {
  return (
    <section className="flex flex-col items-center px-6 sm:px-18 py-12 md:py-14 max-w-7xl mx-auto w-full">
      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-black font-semibold text-2xl sm:text-3xl md:text-4xl max-w-2xl leading-tight"
      >
        Transform Text into Masterpieces
        <br />
        with <span className="text-green-600">Lumora.ai</span>
      </motion.h1>

      {/* CONTENT */}
      <div className="relative w-full flex flex-col gap-4 items-center justify-center mt-8 md:mt-12 max-w-4xl">
        {/* IMAGE CARD */}
        <div className="max-w-4xl md:pr-8 rounded-2xl">
          <motion.img
            src={gif}
            alt="AI generation demo"
            animate={{
              y: [0, -40, 0, 60, 0], // up-down float
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full cursor-grab h-auto object-cover rounded-2xl transition-all duration-700 
            shadow-[0_20px_60px_rgba(34,197,94,0.25)] 
            hover:shadow-[0_40px_120px_rgba(34,197,94,0.5)] 
            hover:scale-[1.01]
            border-2 border-green-600
            "
          />
        </div>

        {/* VERTICAL TEXT (Desktop only) */}
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <p className="[writing-mode:vertical-rl] md:text-2xl lg:text-3xl text-gray-700">
            <span className="text-gray-900">Creative</span>{" "}
            <span className="text-green-600">Prompts</span>{" "}
            <span className="text-gray-900">= Boundless</span>{" "}
            <span className="text-green-600">Creativity</span>
          </p>
        </div>

        <div>
          <p className="md:hidden text-lg sm:text-xl text-gray-700">
            <span className="text-gray-900">Creative</span>{" "}
            <span className="text-green-600">Prompts</span>{" "}
            <span className="text-gray-900">= Boundless</span>{" "}
            <span className="text-green-600">Creativity</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GifSection;
