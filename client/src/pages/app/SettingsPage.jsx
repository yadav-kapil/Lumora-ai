import { useState } from "react";
import {
  RiSettings3Line,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiShieldCheckLine,
  RiNotification4Line,
  RiKey2Line,
  RiFileCopyLine,
  RiEyeOffLine,
  RiEyeLine,
  RiCheckLine,
  RiRefreshLine,
} from "react-icons/ri";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [safetyFilter, setSafetyFilter] = useState("medium");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(false);
  const [marketingAlerts, setMarketingAlerts] = useState(true);
  
  const [apiKey, setApiKey] = useState("sk-lumora_live_8f3d2a9c1e7b6d5c4b3a2");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      const randHex = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      setApiKey(`sk-lumora_live_${randHex}`);
      setRegenerating(false);
      showNotification("New API key generated successfully!");
    }, 1200);
  };

  const showNotification = (msg) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: <RiSettings3Line size={16} /> },
    { id: "safety", label: "Safety & Privacy", icon: <RiShieldCheckLine size={16} /> },
    { id: "notifications", label: "Notifications", icon: <RiNotification4Line size={16} /> },
    { id: "api", label: "API Keys", icon: <RiKey2Line size={16} /> },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl min-h-[600px]">
        {/* Left: Tab list */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-1.5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-5 lg:pb-0 lg:pr-6">
          <div className="flex items-center gap-3.5 mb-6 px-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiSettings3Line size={20} />
            </div>
            <div>
              <h2 className="text-md font-black text-slate-900 tracking-tight leading-none">Settings</h2>
              <p className="text-[10px] font-semibold text-slate-400 mt-1">Configure preferences</p>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "bg-emerald-50 text-emerald-700 shadow-sm border-l-3 border-emerald-500 pl-3.5"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Tab content */}
        <div className="flex-1 lg:pl-6 min-w-0">
          {savedMessage && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl animate-[fadeIn_0.2s_ease-out]">
              {savedMessage}
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">General Settings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Customize theme, language, and core behavior.</p>
              </div>

              {/* Theme Settings */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wide">Interface Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "light", label: "Light", icon: <RiSunLine size={16} /> },
                    { id: "dark", label: "Dark", icon: <RiMoonLine size={16} /> },
                    { id: "system", label: "System", icon: <RiComputerLine size={16} /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        showNotification(`${t.label} theme activated!`);
                      }}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 transition-all cursor-pointer ${
                        theme === t.id
                          ? "border-emerald-500 bg-emerald-50/40 text-emerald-700 shadow-sm font-bold"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-350 hover:text-slate-800"
                      }`}
                    >
                      {t.icon}
                      <span className="text-[11px]">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wide">Application Language</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      showNotification("Language preference updated!");
                    }}
                    className="w-full h-11 px-4 border border-slate-200 bg-white text-xs font-semibold text-slate-700 rounded-2xl outline-none focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    <option value="en">English (US)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                    <option value="de">Deutsch (German)</option>
                    <option value="ja">日本語 (Japanese)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "safety" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Safety & Privacy Settings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Control image generation content filter rules.</p>
              </div>

              {/* Content Safety Filter */}
              <div className="space-y-3.5">
                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wide">Generation Filters</label>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: "low", title: "Low Safety Filter", desc: "Allows more creative freedom with less filtering." },
                    { id: "medium", title: "Medium Safety Filter", desc: "Recommended. Filters explicit content and extreme safety violations." },
                    { id: "strict", title: "Strict Safety Filter", desc: "Strict filters applied. Safe for all workplace presentations." },
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => {
                        setSafetyFilter(level.id);
                        showNotification(`${level.title} set!`);
                      }}
                      className={`flex items-start gap-4 p-4 border rounded-2xl text-left transition-all cursor-pointer ${
                        safetyFilter === level.id
                          ? "border-emerald-500 bg-emerald-50/20"
                          : "border-slate-100 bg-slate-50/30 hover:border-slate-250 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        safetyFilter === level.id ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"
                      }`}>
                        {safetyFilter === level.id && <RiCheckLine size={10} />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{level.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{level.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Notification Settings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Control how and when you receive updates from Lumora.</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    state: emailAlerts,
                    setter: setEmailAlerts,
                    title: "Email Alerts",
                    desc: "Receive weekly updates, new generation features, and plan alerts.",
                  },
                  {
                    state: desktopAlerts,
                    setter: setDesktopAlerts,
                    title: "Desktop Push Notifications",
                    desc: "Show visual desktop popup indicators when generation completes.",
                  },
                  {
                    state: marketingAlerts,
                    setter: setMarketingAlerts,
                    title: "Marketing & Product News",
                    desc: "Get promotions, special discount code packs, and annual receipts.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        item.setter(!item.state);
                        showNotification(`${item.title} updated!`);
                      }}
                      className={`w-10 h-6 shrink-0 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                        item.state ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start"
                      }`}
                    >
                      <div className="bg-white w-4 h-4 rounded-full shadow-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Developer API Keys</h3>
                <p className="text-xs text-slate-400 mt-0.5">Use keys to generate Lumora art within your external apps.</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50/40 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Live Secret Key</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative flex items-center h-11 px-4 border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
                      <input
                        type={showKey ? "text" : "password"}
                        readOnly
                        value={apiKey}
                        className="w-full h-full bg-transparent outline-none text-xs font-mono text-slate-700"
                      />
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3.5 text-slate-400 hover:text-slate-650 cursor-pointer"
                      >
                        {showKey ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                      </button>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm active:scale-95 transition-all"
                    >
                      {copied ? <RiCheckLine size={16} className="text-emerald-500" /> : <RiFileCopyLine size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold">Generated: May 30, 2026</span>
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-250 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <RiRefreshLine size={13} className={regenerating ? "animate-spin" : ""} />
                    {regenerating ? "Regenerating..." : "Regenerate Key"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
