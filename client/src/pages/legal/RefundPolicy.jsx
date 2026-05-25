import React from "react";
import LegalLayout from "./LegalLayout";

const RefundPolicy = () => {
  return (
    <LegalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#081028] tracking-tight">Refund Policy</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">Last Updated: May 2026</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Thank you for subscribing to Lumora.ai. Please read this policy carefully. This is the Return and Refund Policy of Lumora.ai.
        </p>

        <div className="h-px bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">1. Subscription Cancellations</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            You can cancel your subscription at any time. When you cancel, your subscription will remain active until the end of your current billing period, and you will not be charged again. You will continue to have access to your credits and premium features until the cycle ends.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">2. Refund Eligibility</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-semibold text-gray-700 bg-gray-50 border border-gray-100 p-3 rounded-xl">
            Due to the high GPU processing power and computing costs required to generate AI images, we generally do not offer refunds once credits have been used. 
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            However, refunds may be granted under the following circumstances:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li>You were charged twice for the same billing cycle due to a technical payment gateway issue.</li>
            <li>You upgraded and requested a cancellation within 24 hours without using any generation credits.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">3. System Faults & Failed Generations</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If a generation fails or yields distorted results due to a system bug, hardware crash, or model failure, we do not issue monetary refunds, but we will credit the lost tokens back to your account balance. Please file a ticket via the contact page.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">4. Contact Billing Support</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            For refund requests or transaction disputes, please email our billing department at:
          </p>
          <p className="text-xs font-bold text-green-600 mt-2 bg-green-50/50 border border-green-100 inline-block px-3 py-1.5 rounded-lg">
            billing@lumora.ai
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default RefundPolicy;
