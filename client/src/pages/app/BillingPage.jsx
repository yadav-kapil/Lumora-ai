import { useState } from "react";
import { RiBankCardLine, RiCheckLine, RiVipCrownFill, RiCoinLine, RiInformationLine, RiCloseLine } from "react-icons/ri";
import { useAuthContext } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const PLANS = [
  {
    name: "Starter Plan",
    price: "$0",
    period: "forever",
    badge: "Free tier",
    features: ["100 free credits monthly", "Access to Basic Model", "Normal resolution limit", "Community support"],
    active: false,
  },
  {
    name: "Pro Plan",
    price: "$19",
    period: "month",
    badge: "Most popular",
    features: ["1000 credits monthly", "Access to Pro Model", "Up to 2K resolution", "Prioritized speed", "Email support"],
    active: true,
  },
  {
    name: "Ultra Plan",
    price: "$49",
    period: "month",
    badge: "Best Quality",
    features: ["3000 credits monthly", "Access to Premium Model", "Up to 4K resolution", "Instant generations", "24/7 priority support"],
    active: false,
  },
];

export default function BillingPage() {
  const { user, dispatch } = useAuthContext();
  const { showToast } = useToast();
  const userPlan = user?.plan || "free";
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [creditsToBuy, setCreditsToBuy] = useState(100);

  const handleBuyAddonClick = () => {
    if (userPlan === "free") {
      showToast("Subscribe to Pro Plan to add more credits", "error");
    } else {
      setShowCreditsModal(true);
    }
  };

  const handleBuyCredits = () => {
    showToast(`Successfully purchased ${creditsToBuy} credits!`, "success");
    setShowCreditsModal(false);
  };

  const plans = PLANS.map((plan) => {
    let active = false;
    let btnText = "";
    if (userPlan === "free" && plan.name === "Starter Plan") active = true;
    if (userPlan === "pro" && plan.name === "Pro Plan") active = true;
    if (userPlan === "premium" && plan.name === "Ultra Plan") active = true;

    if (active) {
      btnText = "Current Plan";
    } else {
      if (plan.name === "Starter Plan") btnText = "Get Starter";
      if (plan.name === "Pro Plan") btnText = "Go Pro";
      if (plan.name === "Ultra Plan") btnText = "Get Ultra";
    }

    return { ...plan, active, btnText };
  });



  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiBankCardLine size={22} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                Billing & Subscription
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Manage payment options, invoice list and subscription plans
              </p>
            </div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="mb-8 p-6 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <RiCoinLine size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-455 uppercase tracking-wide">Current Credits Balance</p>
              <h3 className="text-xl font-black text-slate-800 mt-1">{user?.credits ?? 0} Credits Remaining</h3>
            </div>
          </div>
          <button
            onClick={handleBuyAddonClick}
            className="rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-600 font-bold px-4 py-2.5 text-xs hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
          >
            Buy Add-on Pack
          </button>
        </div>

        {/* Plan Selection Cards Grid */}
        <h3 className="text-sm font-bold text-slate-800 mb-5">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col relative rounded-3xl border p-6 shadow-sm transition-all duration-300 ${plan.active ? "border-emerald-500 bg-emerald-50/20 scale-[1.02] shadow-md" : "border-slate-150 bg-white"}`}
            >
              {plan.active && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold text-[9px] uppercase tracking-wide px-3 py-1 rounded-full flex items-center gap-1 shadow-sm shadow-emerald-200">
                  <RiVipCrownFill size={9} />
                  Active Plan
                </span>
              )}

              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.badge}</span>
                <div className="flex items-center justify-between flex-wrap gap-y-1">
                  <h4 className="text-base font-black text-slate-800 mt-1">{plan.name}</h4>
                  {(plan.name === "Pro Plan" || plan.name === "Ultra Plan") && (
                    <Link
                      to="/pricing"
                      className="text-slate-400 hover:text-emerald-500 font-bold transition-all text-[11px] inline-flex items-center gap-0.5 ml-2 mt-1.5 cursor-pointer"
                    >
                      <RiInformationLine size={13} />
                      More Info
                    </Link>
                  )}
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-black text-slate-800">{plan.price}</span>
                  <span className="text-xs font-semibold text-slate-400 ml-1">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs font-medium text-slate-650">
                    <RiCheckLine size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.active}
                className={`w-full py-2.5 rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer ${plan.active ? "bg-emerald-100 text-emerald-700 cursor-default" : "bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:brightness-110 hover:-translate-y-px"}`}
              >
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showCreditsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[6px] animate-[fadeIn_0.2s_ease-out]">
          <div className="relative flex w-full max-w-md flex-col rounded-[28px] border border-slate-100 bg-white p-6 md:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.15)] animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                  <RiCoinLine size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-none">
                    Buy Add-on Credits
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 font-semibold">
                    Boost your balance instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreditsModal(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <RiCloseLine size={16} />
              </button>
            </div>

            {/* Slider & Input */}
            <div className="my-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select Amount</span>
                <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-xl shadow-xs">
                  {creditsToBuy} Credits
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={creditsToBuy}
                onChange={(e) => setCreditsToBuy(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-100 rounded-lg outline-none transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5 px-1">
                <span>100 Credits</span>
                <span>5,000 Credits</span>
              </div>
            </div>

            {/* Suggested Options */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">Suggested Packages</label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 2000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCreditsToBuy(val)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${
                      creditsToBuy === val
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm"
                        : "border-slate-200 bg-white text-slate-650 hover:border-slate-350 hover:bg-slate-50"
                    }`}
                  >
                    +{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Action */}
            <button
              onClick={handleBuyCredits}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-emerald-250/40 hover:brightness-110 hover:-translate-y-px transition-all cursor-pointer"
            >
              <RiCoinLine size={14} />
              Buy Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
