import { BiImageAlt } from "react-icons/bi";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const exploreLinks = [
    { name: "Create Image", path: "/app/text-to-image" },
    { name: "Contact", path: "/contact" },
    { name: "Pricing", path: "/pricing" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/legal/privacy" },
    { name: "Terms & Conditions", path: "/legal/terms" },
    { name: "Refund Policy", path: "/legal/refund" },
    { name: "Disclaimer", path: "/legal/disclaimer" }
  ];

  return (
    <footer className="w-full border-t border-gray-300 pt-6 md:pt-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10"
      >
        
        <div className="w-full md:w-[25%] space-y-4">
          <div className="flex items-center gap-2">
            <BiImageAlt className="text-green-600 text-2xl" />
            <h1 className="text-2xl font-semibold">
              <span>Lumora.</span>
              <span className="text-green-500">ai</span>
            </h1>
          </div>

          <p className="text-gray-500 text-sm">
            Generate stunning AI images from simple text prompts. Fast,
            creative, and built for creators.
          </p>

          <div className="flex gap-4 text-gray-600 text-lg">
            {[FaXTwitter, FaLinkedin, FaInstagram, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="transition transform hover:-translate-y-1 hover:text-green-600 duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        
        <div className="w-full md:w-[75%] flex flex-col md:flex-row gap-10 md:gap-20">
          
          <div className="flex  w-full md:justify-end gap-10 md:gap-20">
            
            <div className="w-1/2 sm:w-auto">
              <h2 className="font-semibold mb-3">Explore</h2>
              <ul className="space-y-2 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-500 relative inline-block group transition hover:text-gray-800"
                    >
                      {link.name}
                      <span className="absolute left-1/2 -bottom-0.5 w-0 h-px bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0 "></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            
            <div className="w-1/2 sm:w-auto">
              <h2 className="font-semibold mb-3">Legal</h2>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-500 relative inline-block group transition hover:text-gray-800"
                    >
                      {link.name}
                      <span className="absolute left-1/2 -bottom-0.5 w-0 h-px bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="max-w-[300px] w-full sm:w-[300px]">
            <h2 className="font-semibold mb-3">Stay Updated</h2>
            <p className="text-gray-500 text-sm mb-3">
              Get latest AI art trends & tips weekly.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <button className="bg-green-500 text-white px-3 py-2 text-sm rounded-r-md hover:bg-green-600 transition">
                Join
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      
      <div className="max-w-7xl mx-auto h-px bg-gray-300"></div>

      <div className="text-center text-gray-500 text-xs py-4 flex justify-between max-w-7xl mx-auto px-6">
              <span>© 2025 All rights reserved.</span>
              <span>SYSTUMM</span>
      </div>

      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full overflow-hidden flex justify-center items-end px-4 sm:px-8 md:px-12 lg:px-16 mt-4 md:mt-0 translate-y-2 md:translate-y-4 lg:translate-y-8"
      >
        <h1 className="text-[clamp(48px,12vw,180px)] font-semibold text-center leading-none tracking-tight select-none whitespace-nowrap">
          <span className="text-gray-400/60">LUMORA.</span>
          <span className="text-green-500/50">ai</span>
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;
