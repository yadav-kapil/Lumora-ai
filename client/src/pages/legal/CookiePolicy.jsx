import React from "react";
import LegalLayout from "./LegalLayout";

const CookiePolicy = () => {
  return (
    <LegalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-[#081028] tracking-tight">Cookie Policy</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">Last Updated: May 2026</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          This Cookie Policy explains how Lumora.ai uses cookies and similar technologies to recognize you when you visit our website at https://lumora.ai. It explains what these technologies are and why we use them.
        </p>

        <div className="h-px bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">1. What Are Cookies?</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Cookies are small data files placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">2. Why We Use Cookies</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate (we refer to these as "essential" or "strictly necessary" cookies). Other cookies enable us to track and target the interests of our users to enhance the experience on our Online Properties.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">3. Classification of Cookies We Set</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            The specific types of cookies served through our website and the purposes they perform are detailed below:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
            <li><strong>Essential:</strong> Used to maintain user login sessions, verify identity, prevent cross-site request forgery, and calculate credits consumption accurately.</li>
            <li><strong>Functional:</strong> Remember configuration settings such as editor theme, default image output ratios, and layout choices.</li>
            <li><strong>Analytics:</strong> Collect anonymized page visit data, error rates, and load performance times for service debugging.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">4. How Can I Control Cookies?</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality (such as logging in or maintaining prompts history) will be restricted.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">5. Updates to This Policy</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#081028]">6. Queries</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If you have any questions about our use of cookies or other technologies, please email us at:
          </p>
          <p className="text-xs font-bold text-green-600 mt-2 bg-green-50/50 border border-green-100 inline-block px-3 py-1.5 rounded-lg">
            cookies@lumora.ai
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default CookiePolicy;
