import React from "react";
import LegalLayout from "./LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#081028] tracking-tight">Terms of Service</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">Last Updated: May 2026</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Welcome to Lumora.ai! By accessing our services, creating accounts, or generating images, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
        </p>

        <div className="h-px bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">1. Acceptance of Terms</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            By creating a free or premium account on Lumora.ai, you confirm that you have read, understood, and agreed to these Terms. If you do not agree with any part of these conditions, you must immediately cease usage of our website and generation APIs.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">2. Use of AI Service & License</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Subject to payment of relevant subscription tiers (or free credits allowances), we grant you a non-exclusive, non-transferable, revocable license to access our platform interface, write text prompts, and run image processing workflows.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">3. Image Ownership & Intellectual Property</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            All text prompts inputted and imagery outputted by you are your intellectual property. Lumora.ai does not assert any copyrights over your creations:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li><strong>Commercial Usage:</strong> Premium subscribers (PRO & Premium tiers) receive full rights for commercially redistributing or selling generated assets.</li>
            <li><strong>Fair Use:</strong> Free tier users may use generated assets for personal, non-commercial research, or hobby projects with attribute references.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">4. Acceptable Use Policy</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            You agree not to use our models to generate unlawful, harmful, or abusive visuals. Under these terms, you are strictly prohibited from generating:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li>Imagery depicting explicit violence, hate speech, or harassment.</li>
            <li>Infringing visual works that violate copyrighted material or trademarks of third parties.</li>
            <li>Deceptive, manipulative, or deep-faked content intended to spread political misinformation.</li>
          </ul>
          <p className="text-xs text-red-500 font-semibold mt-1">
            * Violation of our Acceptable Use policy will result in immediate permanent account termination without refunds.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">5. Limitation of Liability</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Lumora.ai provides AI image processing services "as is" and "as available". We do not guarantee uninterrupted server availability or that outputs will meet specific criteria. We are not liable for any direct or indirect losses resulting from usage of generated visuals or model accuracy discrepancies.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">6. Terms Contact</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If you have questions regarding these terms, please contact:
          </p>
          <p className="text-xs font-bold text-green-600 mt-2 bg-green-50/50 border border-green-100 inline-block px-3 py-1.5 rounded-lg">
            legal@lumora.ai
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
