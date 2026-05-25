import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Sparkles,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Globe,
  Clock,
  ChevronDown,
  Building2,
  HelpCircle
} from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const categories = [
    { name: "General Inquiry", desc: "General questions about Lumora.ai" },
    { name: "Technical Support", desc: "Issues with image generation or tool bugs" },
    { name: "Billing & Subscription", desc: "Pricing, upgrades, or invoice issues" },
    { name: "Enterprise & API", desc: "Custom business solutions and API access" },
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategorySelect = (categoryName) => {
    setFormData((prev) => ({ ...prev, category: categoryName }));
    setIsDropdownOpen(false);
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "General Inquiry",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6fbf7] to-white relative overflow-hidden pt-36 pb-20 px-4 md:px-8">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-100px] left-[5%] w-[350px] h-[350px] bg-green-200/25 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[100px] right-[-50px] w-[300px] h-[300px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:48px_48px] -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-600 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_4px_12px_rgba(34,197,94,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#081028] tracking-tight leading-tight"
          >
            Let's build something <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              amazing together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed"
          >
            Have questions about pricing, API access, customized features, or just want to share feedback? Reach out to us below.
          </motion.p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INFO CARDS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* GENERAL SUPPORT */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">General Support</span>
                  <h3 className="text-lg font-bold text-[#081028] mt-0.5">Customer Experience</h3>
                  <p className="text-xs text-gray-500 mt-1">For help with features, billing, or general queries.</p>
                  
                  <div className="flex items-center justify-between mt-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-sm font-semibold text-gray-700">support@lumora.ai</span>
                    <button
                      onClick={() => handleCopy("support@lumora.ai", "support")}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                      title="Copy email address"
                    >
                      {copiedField === "support" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <Clock className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[11px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Response in &lt; 2 hours</span>
                  </div>
                </div>
              </div>
            </div>


            {/* SOCIAL / COMMUNITY LINK PILLS */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#081028] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span>Connect with Us</span>
              </h4>
              <p className="text-xs text-gray-500 mb-4">Follow our official channels and check out our code repository.</p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-all duration-300"
                >
                  <FaLinkedin className="w-4 h-4 text-[#0a66c2]" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-slate-100 hover:border-slate-400 text-xs font-semibold text-gray-600 hover:text-black transition-all duration-300"
                >
                  <FaGithub className="w-4 h-4 text-[#181717]" />
                  GitHub
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-pink-50 hover:border-pink-300 text-xs font-semibold text-gray-600 hover:text-pink-600 transition-all duration-300"
                >
                  <FaInstagram className="w-4 h-4 text-[#e1306c]" />
                  Instagram
                </a>
              </div>
            </div>

            {/* FAQ REDIRECT */}
            <div className="bg-gradient-to-br from-green-500/5 to-emerald-600/5 border border-green-500/10 rounded-2xl p-5 flex items-start gap-3.5">
              <HelpCircle className="w-5.5 h-5.5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#081028]">Have a quick question?</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Browse our Frequently Asked Questions to find instant answers about billing, image resolution, credits, and setup.
                </p>
                <a
                  href="/#faq"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-green-600 hover:text-green-700 mt-3 group"
                >
                  <span>Go to FAQ Page</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/85 backdrop-blur-2xl border border-white/80 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-black text-[#081028] tracking-tight">Send a Message</h2>
                    <p className="text-xs text-gray-500 mt-1 mb-8">We usually get back to you within a couple of business hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* NAME & EMAIL ROW */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        
                        {/* NAME */}
                        <div>
                          <label className="block text-xs font-bold text-[#081028] mb-1.5 uppercase tracking-wider">Your Name</label>
                          <div className={`h-11 rounded-xl border bg-white px-3.5 flex items-center gap-2.5 transition-all ${
                            errors.name 
                              ? "border-red-400 focus-within:ring-4 focus-within:ring-red-50" 
                              : "border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50"
                          }`}>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="w-full h-full bg-transparent outline-none text-sm text-[#081028] placeholder-gray-400 font-medium"
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1.5 pl-1">{errors.name}</p>}
                        </div>

                        {/* EMAIL */}
                        <div>
                          <label className="block text-xs font-bold text-[#081028] mb-1.5 uppercase tracking-wider">Email Address</label>
                          <div className={`h-11 rounded-xl border bg-white px-3.5 flex items-center gap-2.5 transition-all ${
                            errors.email 
                              ? "border-red-400 focus-within:ring-4 focus-within:ring-red-50" 
                              : "border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50"
                          }`}>
                            <input
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="w-full h-full bg-transparent outline-none text-sm text-[#081028] placeholder-gray-400 font-medium"
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1.5 pl-1">{errors.email}</p>}
                        </div>

                      </div>

                      {/* INQUIRY CATEGORY CUSTOM SELECT */}
                      <div className="relative">
                        <label className="block text-xs font-bold text-[#081028] mb-1.5 uppercase tracking-wider">Inquiry Category</label>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all cursor-pointer"
                        >
                          <span className="text-[#081028] font-semibold">{formData.category}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-20"
                              >
                                <div className="p-1.5 max-h-60 overflow-y-auto">
                                  {categories.map((cat) => (
                                    <button
                                      key={cat.name}
                                      type="button"
                                      onClick={() => handleCategorySelect(cat.name)}
                                      className="w-full flex flex-col gap-0.5 text-left p-3 rounded-xl hover:bg-green-50/70 transition-colors group cursor-pointer"
                                    >
                                      <span className="text-xs font-bold text-gray-900 group-hover:text-green-700">{cat.name}</span>
                                      <span className="text-[10px] text-gray-500">{cat.desc}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* SUBJECT */}
                      <div>
                        <label className="block text-xs font-bold text-[#081028] mb-1.5 uppercase tracking-wider">Subject</label>
                        <div className={`h-11 rounded-xl border bg-white px-3.5 flex items-center gap-2.5 transition-all ${
                          errors.subject 
                            ? "border-red-400 focus-within:ring-4 focus-within:ring-red-50" 
                            : "border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50"
                        }`}>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            className="w-full h-full bg-transparent outline-none text-sm text-[#081028] placeholder-gray-400 font-medium"
                          />
                        </div>
                        {errors.subject && <p className="text-red-500 text-[10px] font-bold mt-1.5 pl-1">{errors.subject}</p>}
                      </div>

                      {/* MESSAGE */}
                      <div>
                        <label className="block text-xs font-bold text-[#081028] mb-1.5 uppercase tracking-wider">Message</label>
                        <div className={`rounded-xl border bg-white p-3 flex gap-2.5 transition-all ${
                          errors.message 
                            ? "border-red-400 focus-within:ring-4 focus-within:ring-red-50" 
                            : "border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50"
                        }`}>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Please describe your query details here..."
                            className="w-full bg-transparent outline-none text-sm text-[#081028] placeholder-gray-400 font-medium resize-none leading-relaxed"
                          />
                        </div>
                        {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1.5 pl-1">{errors.message}</p>}
                      </div>

                      {/* SUBMIT BUTTON */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(34,197,94,0.22)] hover:shadow-[0_12px_30px_rgba(34,197,94,0.35)] disabled:opacity-75 disabled:pointer-events-none group"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    className="text-center py-10"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-6 shadow-xs">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h2 className="text-2xl font-black text-[#081028]">Message Sent Successfully!</h2>
                    <p className="mt-3 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting us, <span className="font-bold text-gray-700">{formData.name}</span>. We've received your request and will reach out to <span className="font-bold text-gray-700">{formData.email}</span> shortly.
                    </p>

                    {/* MESSAGE SUMMARY PREVIEW */}
                    <div className="mt-8 bg-gray-50 border border-gray-200/60 rounded-2xl p-5 text-left max-w-md mx-auto">
                      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2.5 mb-2.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ticket Summary</span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{formData.category}</span>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold text-gray-700">Subject:</span> {formData.subject}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-3">
                          <span className="font-semibold text-gray-700">Message:</span> "{formData.message}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={resetForm}
                      className="mt-8 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors shadow-xs cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
