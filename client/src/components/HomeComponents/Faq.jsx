import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoIosArrowDown } from "react-icons/io";
import faqAnime from "../../assets/json_anime/faqAnime.json";
import { faqData } from "../../assets/faqs";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col items-center px-6 sm:px-12 py-12 lg:py-16 max-w-7xl mx-auto w-full">

      {/* HEADING */}
      <h1 className="text-center font-semibold text-2xl sm:text-3xl lg:text-4xl mb-12">
        Frequently Asked <span className="text-green-600">Questions</span>
      </h1>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row w-full gap-12 items-start">

        {/* LEFT - LOTTIE */}
        <div className="lg:flex flex-2 justify-center items-center w-full hidden">
          <DotLottieReact
            data={faqAnime}
            loop
            autoplay
            className="w-full scale-125 -translate-x-12 translate-y-8"
          />
        </div>

        {/* RIGHT - FAQ LIST */}
        <div className="flex flex-3 flex-col gap-5 w-full">

          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300
                border border-white/40
                bg-white/70 backdrop-blur-xl

                shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                hover:shadow-[0_10px_35px_rgba(34,197,94,0.12)]
                hover:-translate-y-[2px]

                ${isOpen && "border-green-300 shadow-[0_8px_30px_rgba(34,197,94,0.18)]"}
                `}
              >

                {/* subtle glow layer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-green-100/20 via-transparent to-green-100/20"></div>

                {/* LEFT ACTIVE BAR */}
                <div className={`absolute left-0 top-0 h-full w-[3px] bg-green-500 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}></div>

                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative z-10 w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer"
                >
                  <span
                    className={`font-medium text-[15px] tracking-tight transition-all duration-200
                    ${isOpen ? "text-green-600" : "text-gray-800 group-hover:text-green-600"}
                    `}
                  >
                    {faq.question}
                  </span>

                  <IoIosArrowDown
                    className={`transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-green-600"
                        : "text-gray-400 group-hover:text-green-500"
                    }`}
                    size={18}
                  />
                </button>

                {/* ANSWER */}
                <div
                  className={`px-5 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Faq;