import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    para: "When you contact us, request a quote, or book a session, we collect information such as your name, email address, phone number, event date, and venue details. We may also collect payment information when processing bookings.",
  },
  {
    title: "How We Use Your Information",
    para: "Your information is used to communicate with you, prepare proposals and contracts, deliver photographs and films, and process payments. We may also use your contact details to send updates about your booking or, with your consent, occasional studio news.",
  },
  {
    title: "Photo & Video Usage",
    para: "Images and films from your event may be used in our portfolio, website, and social media for promotional purposes, unless you request otherwise in writing. We always aim to present your story with the same care we gave it on the day.",
  },
  {
    title: "Data Sharing",
    para: "We do not sell or rent your personal information to third parties. We may share limited details with trusted vendors, such as printing labs or album manufacturers, solely for the purpose of fulfilling your order.",
  },
  {
    title: "Data Storage & Security",
    para: "Your photographs, films, and personal details are stored securely using encrypted cloud storage and access-controlled systems. We take reasonable precautions to protect your information from unauthorized access, loss, or misuse.",
  },
  {
    title: "Cookies & Website Analytics",
    para: "Our website may use cookies and basic analytics tools to understand how visitors use the site and to improve your browsing experience. You can disable cookies through your browser settings at any time.",
  },
  {
    title: "Your Rights",
    para: "You may request access to, correction of, or deletion of your personal information at any time. You may also opt out of promotional communications or request that your images not be used publicly by contacting us directly.",
  },
  {
    title: "Changes to This Policy",
    para: "We may revise this Privacy Policy periodically to reflect changes in our practices or applicable law. Any updates will be posted on this page with a new effective date.",
  },
];

export default function PrivacyPolicy() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');

        .lp-root { font-family: 'Montserrat', sans-serif; }

        .lp-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .lp-reveal.show { opacity: 1; transform: translateY(0); }
      `}</style>

      <main className="lp-root bg-[#faf8f4] min-h-screen px-4 sm:px-10 lg:px-16 py-28 sm:py-32">
        <div className="max-w-3xl mx-auto">

          {/* ── HEADER ── */}
          <div className={`lp-reveal ${visible ? "show" : ""} mb-14 sm:mb-16`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase">
                Legal
              </span>
            </div>

            <h1
              className="text-[#1a1814] font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 6vw, 68px)",
                letterSpacing: "-0.02em",
              }}
            >
              Privacy <span className="italic text-[#c8a96e]">Policy</span>
            </h1>

            <p className="text-[#6b6459] text-sm mt-5 leading-relaxed font-light">
              Last updated: June 2026. Your trust matters to us as much as your memories do.
            </p>

            <div className="mt-10 w-full h-px bg-gradient-to-r from-[#c8a96e]/40 via-[#c8a96e]/10 to-transparent" />
          </div>

          {/* ── SECTIONS ── */}
          <div className="flex flex-col">
            {PRIVACY_SECTIONS.map((section, i) => (
              <div
                key={section.title}
                className={`lp-reveal ${visible ? "show" : ""} py-8 ${
                  i !== PRIVACY_SECTIONS.length - 1 ? "border-b border-[#1a1814]/8" : ""
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-[#c8a96e] text-sm mt-1 flex-shrink-0"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2
                      className="text-[#1a1814] text-xl sm:text-2xl font-light mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-[#6b6459] text-sm sm:text-[15px] leading-relaxed font-light">
                      {section.para}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FOOTER NOTE ── */}
          <div className={`lp-reveal ${visible ? "show" : ""} mt-14 pt-8 border-t border-[#1a1814]/8`}>
            <p className="text-[#9c8f7e] text-xs tracking-wide leading-relaxed font-light">
              Questions about your privacy? Reach out to us at{" "}
              <span className="text-[#c8a96e]">shivtejfilms.work@gmail.com</span> — we're happy to help.
            </p>
          </div>

        </div>
      </main>
    <Footer/>
    </>
  );
}