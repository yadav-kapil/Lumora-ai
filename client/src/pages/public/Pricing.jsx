import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { priceList } from "../../data/pricingList";
import { TfiControlPlay } from "react-icons/tfi";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { Sparkles, Check, X, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import cross from "../../assets/svg/cross.svg";

const Pricing = () => {
  const [activeBox, setActiveBox] = useState(1);

  const comparisonSections = [
    {
      title: "Core Generation",
      features: [
        { name: "Monthly AI Image Limit", basic: "10 images", pro: "50 images", premium: "100 images" },
        { name: "Max Image Resolution", basic: "512px Quality", pro: "1024px Quality (HD)", premium: "2K (Ultra HD)" },
        { name: "Commercial License", basic: false, pro: true, premium: true },
        { name: "Credits Included", basic: "100+ credits", pro: "500+ credits", premium: "1000+ credits" },
      ],
    },
    {
      title: "AI Capabilities",
      features: [
        { name: "Access to Premium Models", basic: false, pro: true, premium: true },
        { name: "Custom Models Training", basic: false, pro: false, premium: true },
        { name: "Prompt Enhancement", basic: false, pro: "Basic AI", premium: "Advanced AI" },
        { name: "Styles & Presets", basic: "Basic only", pro: "Full standard access", premium: "Complete library access" },
      ],
    },
    {
      title: "Speed & Queue",
      features: [
        { name: "Generation Speed", basic: "Standard Speed", pro: "Faster Generation Speed", premium: "Ultra Fast Speed" },
        { name: "Priority Queue Processing", basic: false, pro: false, premium: true },
      ],
    },
    {
      title: "Support & Access",
      features: [
        { name: "Customer Support", basic: "Community Support", pro: "Email Support", premium: "24/7 Priority Chat" },
        { name: "API Access", basic: false, pro: false, premium: "Custom requests" },
        { name: "New Features Early Access", basic: false, pro: false, premium: true },
      ],
    },
  ];

  const renderCellContent = (val) => {
    if (val === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    }
    if (val === false) {
      return <X className="w-4 h-4 text-gray-300 mx-auto opacity-75" />;
    }
    return <span className="text-xs font-semibold text-gray-700 text-center block">{val}</span>;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6fbf7] to-white relative overflow-hidden pt-36 pb-20 px-4 md:px-8">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-100px] left-[5%] w-[450px] h-[450px] bg-green-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[30%] right-[-50px] w-[400px] h-[400px] bg-emerald-100/25 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-green-100/15 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:64px_64px] -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_4px_12px_rgba(34,197,94,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Pricing Plans</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-black text-[#081028] tracking-tight leading-tight"
          >
            Choose a plan that fits <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              your creativity
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed"
          >
            Get flexible subscriptions or scale on-demand. Start for free, upgrade when you need to unlock maximum visual capability.
          </motion.p>
        </div>

        {/* PRICING BOXES SECTION */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 mx-auto gap-8 mb-24">
          {priceList.map((list, index) => {
            const isPro = list.type === "PRO";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 22 }
                }}
                className={`pt-8 pb-4 px-6 rounded-[32px] flex flex-col gap-5 w-full md:w-3/4 md:mx-auto lg:w-full cursor-pointer border-2 transition-[border-color,box-shadow] duration-300 relative overflow-hidden group ${
                  isPro 
                    ? "bg-white/90 border-green-500 shadow-[0_20px_50px_rgba(34,197,94,0.12)]" 
                    : "bg-white/80 border-gray-200/50 hover:border-green-500/40 shadow-xl shadow-black/[0.02]"
                }`}
              >
                {/* PRO GLOW HIGHLIGHT */}
                {isPro && (
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-green-400/5 blur-[50px] rounded-full -z-10" />
                )}

                <div className="flex justify-between items-center">
                  <h1 className="text-[#081028] font-black text-2xl md:text-3xl leading-tight tracking-tight">
                    {list.type}
                  </h1>
                  {list.tag && (
                    <motion.p 
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="bg-linear-to-r from-[#05e056] to-[#04aa42] text-white px-3 py-1 rounded-full text-[9px] font-extrabold flex justify-center items-center gap-1 shadow-md shadow-green-500/25 cursor-default uppercase tracking-wider"
                    >
                      <BsLightningChargeFill className="text-white w-2.5 h-2.5" />
                      <span>{list.tag}</span>
                    </motion.p>
                  )}
                </div>
                
                <p className="flex justify-start items-end gap-1 border-b border-gray-100 pb-4">
                  <span className="text-[#081028] text-4.5xl font-black tracking-tight">{`${list.price}$`}</span>
                  <span className="text-gray-400 font-semibold text-sm mb-1.5">/mon</span>
                </p>
                
                <p className="text-gray-500 font-medium text-xs leading-relaxed min-h-[40px]">{list.imgNoText}</p>
                
                <div className="flex flex-col gap-3 mt-2 justify-center items-center w-full">
                  <button className="flex gap-2 justify-center items-center text-[11px] font-bold px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100/80 transition-all border border-gray-200/60 rounded-full w-full cursor-pointer">
                    <FaCoins className="text-green-500" />
                    <span>{list.credits}</span>
                  </button>
                  <button className={`py-3 w-full rounded-full text-xs font-black uppercase tracking-widest flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
                    isPro 
                      ? "bg-linear-to-r from-[#05e056] to-[#04aa42] hover:from-[#04aa42] hover:to-[#03963a] text-white hover:shadow-green-500/35 hover:scale-[1.02]" 
                      : "bg-[#081028] hover:bg-black text-white hover:scale-[1.02]"
                  }`}>
                    <span>{list.button}</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3.5 w-full mt-2 px-5 py-5 rounded-2xl bg-gray-50/65 border border-gray-200/50 backdrop-blur-xs">
                  {list.features.map((feature, i) => {
                    const isUnsupported = feature.icon === "wrong";
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 aspect-square ${
                          isUnsupported 
                            ? "bg-gray-100/50 border-gray-200" 
                            : "bg-green-500/10 border-green-500/20"
                        }`}>
                          {feature.icon === "tick" ? (
                            <TiTick className="text-green-600 text-sm" />
                          ) : (
                            <img src={cross} className="w-2 h-2 opacity-30" alt="not available" />
                          )}
                        </div>
                        <p className={`text-xs font-semibold leading-normal ${isUnsupported ? "text-gray-400" : "text-gray-700"}`}>
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

        {/* PLANS COMPARISON TABLE */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#081028] tracking-tight">Compare Plan Features</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">A detailed lookup of specs, generation controls, and limits</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden max-w-full">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[768px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200/60 bg-gray-50/50">
                    <th className="py-6 px-6 text-sm font-bold text-gray-900 w-1/3">Features</th>
                    <th className="py-6 px-6 w-2/9 text-center bg-gray-100/20">
                      <span className="block text-sm font-black text-gray-700">Basic</span>
                      <span className="block text-[10px] text-gray-400 font-bold mt-0.5">Free Plan</span>
                    </th>
                    <th className="py-6 px-6 w-2/9 text-center bg-green-500/[0.02]">
                      <span className="block text-sm font-black text-green-600">PRO</span>
                      <span className="block text-[10px] text-green-500/80 font-bold mt-0.5">$2 / month</span>
                    </th>
                    <th className="py-6 px-6 w-2/9 text-center bg-gray-100/20">
                      <span className="block text-sm font-black text-gray-700">Premium</span>
                      <span className="block text-[10px] text-gray-400 font-bold mt-0.5">$5 / month</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonSections.map((section, idx) => (
                    <React.Fragment key={idx}>
                      {/* SECTION ROW */}
                      <tr className="bg-gray-100/40 border-y border-gray-200/30">
                        <td colSpan={4} className="py-3 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {section.title}
                        </td>
                      </tr>
                      {/* FEATURE ROWS */}
                      {section.features.map((feature, fIdx) => (
                        <tr
                          key={fIdx}
                          className="border-b border-gray-200/50 hover:bg-green-500/[0.01] transition-all duration-200"
                        >
                          <td className="py-4 px-6 text-xs font-bold text-[#081028]">
                            {feature.name}
                          </td>
                          <td className="py-4 px-6 text-center w-2/9 bg-gray-100/10">
                            {renderCellContent(feature.basic)}
                          </td>
                          <td className="py-4 px-6 text-center w-2/9 bg-green-500/[0.01] font-bold">
                            {renderCellContent(feature.pro)}
                          </td>
                          <td className="py-4 px-6 text-center w-2/9 bg-gray-100/10">
                            {renderCellContent(feature.premium)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* FOOTER CALL TO ACTION */}
            <div className="bg-gray-50/70 p-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-xs text-gray-500 font-semibold">Secure checkout. Cancel or modify plans anytime with zero hidden fees.</span>
              </div>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#081028] hover:bg-black text-white text-xs font-black transition-all hover:scale-[1.02] shadow-md cursor-pointer uppercase tracking-wider"
              >
                <span>Enterprise Custom Quote</span>
              </NavLink>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Pricing;
