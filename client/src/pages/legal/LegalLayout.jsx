import React from "react";
import { NavLink } from "react-router-dom";
import { Sparkles, Shield, FileText, Cookie, CreditCard, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

const LegalLayout = ({ children }) => {
  const tabs = [
    { name: "Privacy Policy", path: "/legal/privacy", icon: Shield },
    { name: "Terms of Service", path: "/legal/terms", icon: FileText },
    { name: "Cookie Policy", path: "/legal/cookies", icon: Cookie },
    { name: "Refund Policy", path: "/legal/refund", icon: CreditCard },
    { name: "Disclaimer", path: "/legal/disclaimer", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6fbf7] to-white relative overflow-hidden pt-36 pb-20 px-4 md:px-8">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-100px] left-[5%] w-[400px] h-[400px] bg-green-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[100px] right-[-50px] w-[350px] h-[350px] bg-emerald-100/25 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:48px_48px] -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_4px_12px_rgba(34,197,94,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legal Center</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#081028] tracking-tight leading-tight"
          >
            Trust & <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Transparency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed"
          >
            We're committed to protecting your data, ownership rights, and offering clear guidelines for our platform.
          </motion.p>
        </div>

        {/* CONTAINER GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR TABS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-sm space-y-1.5"
          >
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Documents</h2>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? "bg-green-500/10 text-green-600 shadow-xs" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#081028]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.name}</span>
                </NavLink>
              );
            })}
          </motion.div>

          {/* MAIN DOCUMENT TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 sm:p-10 shadow-sm leading-relaxed"
          >
            {children}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default LegalLayout;
