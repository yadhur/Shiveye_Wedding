import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const TERMS_SECTIONS = [
  {
    title: "Acceptance of Terms",
    para: "By accessing or using the Shiveye Wedding website and booking our photography or videography services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services or this website.",
  },
  {
    title: "Our Services",
    para: "Shiveye Wedding provides professional wedding photography, videography, and related visual storytelling services. The specific deliverables, timelines, and inclusions for your event will be confirmed in a separate booking agreement or contract prior to your event date.",
  },
  {
    title: "Booking & Payment",
    para: "A non-refundable retainer is required to secure your event date. The remaining balance is due as outlined in your signed contract, typically before or on the day of the event. Failure to complete payment as agreed may result in delayed delivery of final images and films.",
  },
  {
    title: "Cancellations & Rescheduling",
    para: "We understand plans can change. Cancellations made within 30 days of the event date may not be eligible for a refund of the retainer. Rescheduling is subject to our availability and must be requested in writing as early as possible.",
  },
  {
    title: "Copyright & Usage Rights",
    para: "Shiveye Wedding retains full copyright over all photographs and videos captured. Clients are granted a personal-use license to print, share, and display their images and films. Commercial use, resale, or redistribution requires prior written consent from us.",
  },
  {
    title: "Image Delivery Timeline",
    para: "Edited photographs and films are typically delivered within 6 to 10 weeks of the event date, depending on the season and scope of work. Rush delivery may be available upon request for an additional fee.",
  },
  {
    title: "Limitation of Liability",
    para: "While we take every precaution to protect your images and equipment, Shiveye Wedding is not liable for circumstances beyond our control, including but not limited to equipment failure, venue restrictions, weather conditions, or acts of God that may affect coverage.",
  },
  {
    title: "Changes to These Terms",
    para: "We may update these Terms and Conditions from time to time to reflect changes in our practices or for legal reasons. Continued use of our services after changes are posted constitutes your acceptance of the revised terms.",
  },
];

export default function TermsAndConditions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    <Navbar/>
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
              Terms <span className="italic text-[#c8a96e]">&amp; Conditions</span>
            </h1>

            <p className="text-[#6b6459] text-sm mt-5 leading-relaxed font-light">
              Last updated: June 2026. Please read these terms carefully before booking a session with us.
            </p>

            <div className="mt-10 w-full h-px bg-gradient-to-r from-[#c8a96e]/40 via-[#c8a96e]/10 to-transparent" />
          </div>

          {/* ── SECTIONS ── */}
          <div className="flex flex-col">
            {TERMS_SECTIONS.map((section, i) => (
              <div
                key={section.title}
                className={`lp-reveal ${visible ? "show" : ""} py-8 ${
                  i !== TERMS_SECTIONS.length - 1 ? "border-b border-[#1a1814]/8" : ""
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
              Questions about these terms? Reach out to us at{" "}
              <span className="text-[#c8a96e]">hello@shiveyewedding.com</span> before confirming your booking.
            </p>
          </div>

        </div>
      </main>
      <Footer/>
    </>
  );
}