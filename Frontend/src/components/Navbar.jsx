import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { href, useNavigate } from "react-router-dom";
import logo from "/images/logo.PNG";

const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "/about" },
  // { label: "Services",    href: "#services" },
  { label: "Testimonial", href: "/testimonials" },
  // { label: "Contact",     href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@300;400;500&display=swap');
        .nav-root  { font-family:'Montserrat',sans-serif; }
        .logo-font { font-family:'Cormorant Garamond',serif; }

        /* Link underline */
        .nav-lnk { position:relative; letter-spacing:.12em; transition:color .3s; }
        .nav-lnk::after {
          content:''; position:absolute; bottom:-3px; left:50%;
          width:0; height:1px;
          background:linear-gradient(90deg,#e7e2d6,#ffffff);
          transform:translateX(-50%);
          transition:width .35s cubic-bezier(.4,0,.2,1);
        }
        .nav-lnk:hover::after, .nav-lnk.active-l::after { width:100%; }

        /* Book button */
        .book-btn { position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.35); transition:color .3s; }
        .book-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,#ffffff,#e7e2d6);
          transform:translateX(-101%);
          transition:transform .4s cubic-bezier(.4,0,.2,1);
        }
        .book-btn:hover::before { transform:translateX(0); }
        .book-btn:hover { color:#45604f; }
        .book-btn span  { position:relative; z-index:1; }

        /* Logo pulse ring */
        .logo-ring { animation:lRing 3s ease-in-out infinite; }
        @keyframes lRing {
          0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.18);}
          50%    {box-shadow:0 0 0 6px rgba(255,255,255,0);}
        }
      `}</style>

      <header className={`nav-root fixed top-0 left-0 right-0 z-50 transition-all duration-500
       bg-[#45604f]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.35)]`}
      >
        <div className="px-4 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
 {/* ── Mobile hamburger ── */}
 <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white border border-white/25 rounded hover:border-white/60 transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <Icon icon={menuOpen ? "ph:x-light" : "ph:list-light"} className="w-5 h-5" />
              </motion.div>
            </motion.button>
              <div className="leading-none sm:block lg:hidden">
                  <img src={logo} alt="logo" className="w-40 h-8" />

              </div>

            {/* ── Logo (left side, white) ── */}
            <motion.a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-3 group"
            >
              <div className="text-right leading-none hidden sm:block">
               <img src={logo} alt="logo" className="w-50 h-10" />
              </div>
              
            </motion.a>
            {/* ── Desktop links (left side) ── */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="hidden md:flex items-center gap-8"
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.span
                  key={label}
                  onClick={() => navigate(href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
                  className={`nav-lnk text-[11px] uppercase font-medium pb-0.5 cursor-pointer
                    ${window.location.pathname === href ? "text-white active-l" : "text-white/55 hover:text-white/95"}`}
                >
                  {label}
                </motion.span>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                whileTap={{ scale: 0.97 }}
                className="book-btn ml-2 px-6 py-2.5 text-white text-[11px] tracking-[0.18em] uppercase"
                onClick={() => navigate("/contact")}
              >
                <span className="flex items-center gap-2">
                  <Icon icon="ph:camera-light" className="w-3.5 h-3.5" />
                  Book Session
                </span>
              </motion.button>
            </motion.nav>

           
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden bg-[#3c5343]/98 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-6 pt-5 pb-8">
                {/* Logo repeated at top of mobile menu */}
                

                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      onClick={(e) => { e.preventDefault(); navigate(href); setMenuOpen(false); }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className={`flex items-center gap-3 px-4 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-colors
                        ${window?.location?.pathname === href
                          ? "text-white border-l border-white"
                          : "text-white/50 hover:text-white/90 border-l border-transparent"}`}
                    >
                      <Icon icon="ph:dot-outline-fill" className="w-2 h-2" />
                      {label}
                    </motion.a>
                  ))}

                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="book-btn mt-5 px-6 py-3.5 text-white text-[11px] tracking-[0.18em] uppercase w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Icon icon="ph:camera-light" className="w-4 h-4" />
                      Book Session
                    </span>
                  </motion.button>
                </nav>

                {/* Social row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex gap-5 mt-8 pt-6 border-t border-white/10"
                >
                  {[
                    { icon: "ph:instagram-logo-light", label: "Instagram", href:"https://www.instagram.com/shivtejdeshmukh_?igsh=dnhqMm9nOXdkcmJo"},
                    { icon: "ph:youtube-logo-light",   label: "YouTube",   href: "http://www.youtube.com/@shivtej_deshmukh" },

                    
       
                  ].map(({ icon, label }) => (
                    <a key={icon} href="#" className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors">
                      <Icon icon={icon} className="w-4 h-4" />
                      <span className="text-[9px] tracking-[0.15em] uppercase">{label}</span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}