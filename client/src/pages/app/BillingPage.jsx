import { useState } from "react";
import { RiBankCardLine, RiCheckLine, RiVipCrownFill, RiCoinLine } from "react-icons/ri";

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
  const [activePlan, setActivePlan] = useState("Pro Plan");

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
              <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Current Credits Balance</p>
              <h3 className="text-xl font-black text-slate-800 mt-1">100 Credits Remaining</h3>
            </div>
          </div>
          <button className="rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-600 font-bold px-4 py-2.5 text-xs hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
            Buy Add-on Pack
          </button>
        </div>

        {/* Plan Selection Cards Grid */}
        <h3 className="text-sm font-bold text-slate-800 mb-5">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
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
                <h4 className="text-base font-black text-slate-800 mt-1">{plan.name}</h4>
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
                onClick={() => setActivePlan(plan.name)}
                className={`w-full py-2.5 rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer ${plan.active ? "bg-emerald-100 text-emerald-700 cursor-default" : "bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:brightness-110 hover:-translate-y-px"}`}
              >
                {plan.active ? "Currently Selected" : "Upgrade Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
