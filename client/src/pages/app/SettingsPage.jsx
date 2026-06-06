import { useState, useEffect } from "react";
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
  RiCodeSSlashLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useToast } from "../../context/ToastContext";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState("system");
  const [safetyFilter, setSafetyFilter] = useState("medium");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(false);
  const [marketingAlerts, setMarketingAlerts] = useState(true);

  const { user, accessToken, dispatch } = useAuthContext();

  // Security tab toggles
  const [uploadToCommunity, setUploadToCommunity] = useState(
    user?.enableCommunity ?? true
  );
  const [enablePushNotification, setEnablePushNotification] = useState(
    user?.enableNotification ?? true
  );

  useEffect(() => {
    if (user) {
      setUploadToCommunity(user.enableCommunity ?? true);
      setEnablePushNotification(user.enableNotification ?? true);
    }
  }, [user]);
  
  const [apiKey, setApiKey] = useState("sk-lumora_live_8f3d2a9c1e7b6d5c4b3a2");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleToggleCommunity = async () => {
    const newValue = !uploadToCommunity;
    setUploadToCommunity(newValue);
    showLoading("Saving Preferences", "Updating your community upload preference...");
    try {
      const res = await fetch(`/api/auth/setting`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          enableCommunity: newValue,
          enableNotification: enablePushNotification,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update community preference");
      }
      dispatch({
        type: "UPDATE_SETTINGS",
        payload: {
          enableCommunity: newValue,
          enableNotification: enablePushNotification,
        },
      });
      showToast("Community settings updated successfully!", "success", "Settings Saved");
    } catch (err) {
      console.error(err);
      setUploadToCommunity(!newValue);
      showToast(err.message || "Something went wrong", "error", "Update Failed");
    } finally {
      hideLoading();
    }
  };

  const handleToggleNotification = async () => {
    const newValue = !enablePushNotification;
    setEnablePushNotification(newValue);
    showLoading("Saving Preferences", "Updating your push notification preference...");
    try {
      const res = await fetch(`/api/auth/setting`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          enableCommunity: uploadToCommunity,
          enableNotification: newValue,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update notification preference");
      }
      dispatch({
        type: "UPDATE_SETTINGS",
        payload: {
          enableCommunity: uploadToCommunity,
          enableNotification: newValue,
        },
      });
      showToast("Push notification settings updated successfully!", "success", "Settings Saved");
    } catch (err) {
      console.error(err);
      setEnablePushNotification(!newValue);
      showToast(err.message || "Something went wrong", "error", "Update Failed");
    } finally {
      hideLoading();
    }
  };

  const handleLogout = async () => {
    showLoading("Logging Out", "Signing out of your session, please wait...");
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      navigate("/", { replace: true, flushSync: true });
      dispatch({
        type: "LOGOUT",
      });
    } catch (err) {
      console.error(err);
      showToast("Logout failed. Please try again.", "error", "Logout Failed");
    } finally {
      hideLoading();
    }
  };


  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      const randHex = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join("");
      setApiKey(`sk-lumora_live_${randHex}`);
      setRegenerating(false);
      showNotification("New API key generated successfully!");
    }, 1200);
  };

  const showNotification = (msg) => {
    showToast(msg, "success", "Settings Updated");
  };

  const tabs = [
    { id: "general", label: "General", icon: <RiSettings3Line size={16} /> },
    {
      id: "security",
      label: "Security",
      icon: <RiShieldCheckLine size={16} />,
    },
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
              <h2 className="text-md font-black text-slate-900 tracking-tight leading-none">
                Settings
              </h2>
              <p className="text-[10px] font-semibold text-slate-400 mt-1">
                Configure preferences
              </p>
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

          {activeTab === "general" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">
                  General Settings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customize theme and core interface behavior.
                </p>
              </div>

              {/* Theme Settings */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wide">
                  Interface Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "light",
                      label: "Light",
                      icon: <RiSunLine size={16} />,
                    },
                    {
                      id: "dark",
                      label: "Dark",
                      icon: <RiMoonLine size={16} />,
                    },
                    {
                      id: "system",
                      label: "System",
                      icon: <RiComputerLine size={16} />,
                    },
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
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">
                  Security Settings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage your account safety preferences and connectivity.
                </p>
              </div>

              <div className="space-y-3">
                {/* Upload To Community Toggle */}
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                  <div className="pr-4">
                    <h4 className="text-xs font-bold text-slate-800">Upload To Community</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Share your generated creations automatically with the public community feed.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleCommunity}
                    className={`w-10 h-6 shrink-0 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                      uploadToCommunity ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start"
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Enable Push Notification Toggle */}
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                  <div className="pr-4">
                    <h4 className="text-xs font-bold text-slate-800">Enable Push Notification</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Allow browser push notifications when long-running model generations finish.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleNotification}
                    className={`w-10 h-6 shrink-0 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                      enablePushNotification ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start"
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 h-11 text-xs font-black text-white shadow-md shadow-red-200/40 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  <RiLogoutBoxRLine size={14} />
                  Logout Account
                </button>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 animate-[fadeIn_0.25s_ease-out]">
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">
                  Developer API
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Integrate Lumora into your applications and workflows.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <RiCodeSSlashLine size={24} className="text-slate-500" />
                </div>

                <h4 className="text-sm font-black text-slate-800">
                  Developer API Currently Unavailable
                </h4>

                <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                  We're actively working on our developer platform. API access,
                  authentication keys, usage analytics, and documentation will
                  be available in a future release.
                </p>

                <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold text-slate-500">
                  Coming Soon
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[4px] animate-[fadeIn_0.2s_ease-out]">
          <div className="relative flex w-full max-w-sm flex-col rounded-[24px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)]">
            <h3 className="text-sm font-black text-slate-800 tracking-tight">Logout</h3>
            <p className="mt-2 text-xs font-semibold text-slate-450 leading-relaxed">
              Are you sure you want to log out of your account?
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="flex-1 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-xs font-bold text-white shadow-md shadow-red-200/50 hover:brightness-105 active:scale-[0.99] cursor-pointer transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
