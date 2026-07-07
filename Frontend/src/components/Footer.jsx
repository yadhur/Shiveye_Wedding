import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import logo from "/images/logo.PNG";

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1], delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay } },
});

/* ── Data ── */
const LINKS = {
  Explore: [
    { label: "About",        link: "/about" },
    { label: "Testimonials", link: "/testimonials" },
    { label: "Contact", link: "/#contactForm" },
  ],
  Services: [
    { label: "Pre-Wedding", link:'/service-gallery/pre-wedding' },
    { label: "Wedding",   link:'/service-gallery/wedding' },
    { label: "Wedding Films", link:'/service-films/wedding' },
    { label: "Pre-Wedding Flims", link:'/service-films/pre-wedding' },
  ],
};

const SOCIALS = [
  { icon: "ph:instagram-logo-light", label: "Instagram", href: "https://www.instagram.com/shivtejdeshmukh_?igsh=dnhqMm9nOXdkcmJo" },
  { icon: "ph:youtube-logo-light",   label: "YouTube",   href: "http://www.youtube.com/@shivtej_deshmukh" },
];

const CONTACT = [
  { icon: "ph:envelope-simple-light", text: "shivtejfilms.work@gmail.com" },
  { icon: "ph:phone-light",           text: "+91 8830201183" },
  { icon: "ph:map-pin-light",         text: "Amaravati, Maharashtra, India" },
  { icon: "ph:map-pin-light",         text: "Pune, Maharashtra, India" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap');

        .footer-root  { font-family: 'Montserrat', sans-serif; }
        .display-font { font-family: 'Cormorant Garamond', serif; }

        /* Grain */
        .f-grain::before {
          content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:.25;
        }

        /* Gold text */
        .gold-text {
          background: linear-gradient(135deg,#c9a96e 0%,#e8d5a3 40%,#c9a96e 70%,#a07840 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }

        /* Footer links */
        .f-link {
          position:relative; display:inline-flex; align-items:center; gap:6px;
          transition:color .25s;
        }
        .f-link::after {
          content:''; position:absolute; bottom:-2px; left:0;
          width:0; height:1px;
          background:linear-gradient(90deg,#c9a96e,transparent);
          transition:width .3s cubic-bezier(.4,0,.2,1);
        }
        .f-link:hover { color:#c9a96e; }
        .f-link:hover::after { width:100%; }

        /* Newsletter input */
        .nl-input {
          background:rgba(255,255,255,.04);
          border:1px solid rgba(201,169,110,.2);
          color:#fff;
          transition:border-color .3s, background .3s;
          outline:none;
        }
        .nl-input::placeholder { color:rgba(255,255,255,.25); }
        .nl-input:focus {
          border-color:rgba(201,169,110,.6);
          background:rgba(201,169,110,.04);
        }

        /* Submit button */
        .nl-btn {
          position:relative; overflow:hidden;
          background:linear-gradient(135deg,#c9a96e,#a07840);
          transition:transform .2s, box-shadow .2s;
        }
        .nl-btn:hover {
          transform:translateY(-1px);
          box-shadow:0 6px 24px rgba(201,169,110,.3);
        }
        .nl-btn:active { transform:translateY(0); }

        /* Social icon */
        .soc-icon {
          border:1px solid rgba(201,169,110,.18);
          transition:border-color .25s, background .25s, transform .25s;
        }
        .soc-icon:hover {
          border-color:#c9a96e;
          background:rgba(201,169,110,.08);
          transform:translateY(-3px);
        }

        /* Horizontal rule glow */
        .hr-gold {
          border:none;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,169,110,.3),rgba(201,169,110,.5),rgba(201,169,110,.3),transparent);
        }

        /* Back-to-top */
        .btt {
          border:1px solid rgba(201,169,110,.25);
          transition:border-color .25s, background .25s, transform .3s;
        }
        .btt:hover {
          border-color:#c9a96e;
          background:rgba(201,169,110,.08);
          transform:translateY(-3px);
        }

        /* Spin slow */
        .spin-s { animation:spS 22s linear infinite; }
        @keyframes spS { to { transform:rotate(360deg); } }

        /* Marquee */
        .marquee-track {
          display:flex; gap:3rem;
          animation:marquee 25s linear infinite;
          white-space:nowrap;
        }
        @keyframes marquee {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
      `}</style>

      <footer ref={ref} className="footer-root f-grain relative bg-[#2f4034] overflow-hidden">

       

        {/* ── Subtle grid ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{backgroundImage:'linear-gradient(rgba(201,169,110,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,.5) 1px,transparent 1px)',backgroundSize:'80px 80px'}}
        />

        {/* ════════════════════════════════════
            MARQUEE STRIP
        ════════════════════════════════════ */}
        <div className="relative z-10 border-b border-[#c9a96e]/8 py-4 overflow-hidden">
          <div className="marquee-track">
            {[...Array(2)].map((_, ri) =>
              ["Portrait","Wedding","Pre-Wedding","Engagement","Fine Art","Documentary"].map((t, i) => (
                <span key={`${ri}-${i}`} className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/20">
                  <Icon icon="ph:aperture-light" className="w-3 h-3 text-[#c9a96e]/40 spin-s flex-shrink-0" />
                  {t}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ════════════════════════════════════
            MAIN FOOTER BODY
        ════════════════════════════════════ */}
        <div className="relative z-10 px-4 sm:px-10 lg:px-16 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* ── Col 1 — Brand (5 cols) ── */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
               <img src={logo} alt="logo" className="w-30 h-8" />
              </Link>

              {/* Tagline */}
              <p className="display-font text-[clamp(1.6rem,3vw,2.2rem)] font-light italic text-white/70 leading-snug max-w-xs">
                <span className="gold-text font-semibold not-itali fs-['12px']">Capturing emotion, light, and the stories that make you, you.</span>
              </p>

             

              
            </motion.div>

            {/* ── Col 2 — Nav links (4 cols) ── */}
            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="lg:col-span-4 grid grid-cols-2 gap-8"
            >
              {Object.entries(LINKS).map(([heading, links]) => (
                <div key={heading} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-px bg-[#c9a96e]/50" />
                    <span className="text-[10px] text-[#c9a96e] tracking-[0.3em] uppercase font-medium">{heading}</span>
                  </div>
                  {links.map(({ label, href, link }) =>
                    link ? (
                      <Link
                        key={label}
                        to={link}
                        className="f-link text-white/40 text-xs tracking-wide"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        key={label}
                        className="f-link text-white/40 text-xs tracking-wide"
                      >
                        {label} hello
                      </span>
                    )
                  )}
                </div>
              ))}
            </motion.div>

            {/* ── Col 3 — Service (3 cols) ── */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="lg:col-span-3 flex flex-col gap-5"
            >
            {/* Contact list */}
            <div className="flex flex-col gap-3 mt-2">
                {CONTACT.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-full border border-[#c9a96e]/15 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a96e]/50 transition-colors">
                      <Icon icon={icon} className="w-3.5 h-3.5 text-[#c9a96e]/50" />
                    </div>
                    <span className="text-white/40 text-xs tracking-wide hover:text-[#c9a96e] transition-colors cursor-pointer">{text}</span>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-2">
                {SOCIALS.map(({ icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileTap={{ scale: 0.92 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soc-icon w-9 h-9 rounded-full flex items-center justify-center"
                  >
                    <Icon icon={icon} className="w-4 h-4 text-[#c9a96e]/50" />
                  </motion.a>
                ))}
              </div>

              
            </motion.div>
          </div>

          {/* ════════════════════════════════════
              DIVIDER
          ════════════════════════════════════ */}
          <motion.hr
            variants={fadeIn(0.4)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="hr-gold my-10"
          />

          {/* ════════════════════════════════════
              BOTTOM BAR
          ════════════════════════════════════ */}
          <motion.div
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            {/* Copyright */}
            <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase text-center sm:text-left">
              © {new Date().getFullYear()} Shiveye Wedding Photography. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-white/20 text-[10px] tracking-[0.15em] uppercase hover:text-[#c9a96e] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Back to top */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btt flex items-center gap-2 px-4 py-2 text-[#c9a96e]/60 text-[10px] tracking-[0.2em] uppercase rounded-none"
            >
              <span>Back to top</span>
              <Icon icon="ph:arrow-up-light" className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>
      </footer>
    </>
  );
}