import React from "react";
import LegalLayout from "./LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#081028] tracking-tight">Privacy Policy</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">Last Updated: May 2026</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          At Lumora.ai, accessible from https://lumora.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Lumora.ai and how we use it.
        </p>

        <div className="h-px bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">1. Information We Collect</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We collect information you provide directly to us when creating an account, generating images, or communicating with support:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li><strong>Account Credentials:</strong> Email, username, and authentication tokens (e.g., Google or GitHub Sign-In details).</li>
            <li><strong>Text Prompts:</strong> Raw prompt scripts, parameter specifications (dimensions, models) you input to generate visual art.</li>
            <li><strong>Transactional Data:</strong> Plan choices, subscription status, billing references (we do not store raw credit card details; transaction handling is secure).</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">2. How We Use Your Information</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We utilize collected statistics for multiple functional operations:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li>To operate, compute, maintain, and deliver the AI image generation services.</li>
            <li>To secure access control, confirm credentials, and compute monthly credits.</li>
            <li>To analyze usage metrics for performance debugging and software upgrade cycles.</li>
            <li>To prevent fraud, abuse of terms, and illegal content generations.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">3. Image Ownership & Privacy</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-semibold text-gray-700 bg-gray-50 border border-gray-100 p-3 rounded-xl">
            You maintain full ownership of all prompts and generated images you create. Unless you explicitly choose to publish your creations to the public community showcase, your generations remain private and protected inside your secure dashboard workspace.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">4. Data Retention & Deletion</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We store account statistics and created imagery logs for as long as your account remains active. You can request a complete delete at any time. When you trigger account deletion, all personal information, workspace folders, credit counters, and generated images are permanently wiped from our secure database servers.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">5. Contact Us</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at:
          </p>
          <p className="text-xs font-bold text-green-600 mt-2 bg-green-50/50 border border-green-100 inline-block px-3 py-1.5 rounded-lg">
            privacy@lumora.ai
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
