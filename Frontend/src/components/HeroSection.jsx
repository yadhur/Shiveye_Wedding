import { useState, useEffect } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Montserrat:wght@300;400;500&display=swap');

        .hero-root {
          font-family: 'Montserrat', sans-serif;
        }
        .display-font {
          font-family: 'Cormorant Garamond', serif;
        }

        /* Grain overlay */
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        /* Reveal animations */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
        }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 1s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1);
        }
        .reveal-right.show { opacity: 1; transform: translateX(0); }

        .delay-1 { transition-delay: 0.15s; }
        .delay-2 { transition-delay: 0.3s; }
        .delay-3 { transition-delay: 0.5s; }
        .delay-4 { transition-delay: 0.65s; }
        .delay-cam { transition-delay: 0.4s; }

        /* Highlight word — gold shimmer, warmer against the green */
        .accent-text {
          background: linear-gradient(135deg, #e8d5a3 0%, #c9a96e 40%, #f0e2bc 70%, #c9a96e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Decorative line */
        .divider-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1) 0.7s;
        }
        .divider-line.show { width: 120px; }

        /* Camera SVG glow */
        .cam-glow {
          filter: drop-shadow(0 0 40px rgba(201,169,110,0.18)) drop-shadow(0 0 80px rgba(255,255,255,0.06));
        }

        /* Aperture spin */
        .aperture-spin {
          animation: spin 18s linear infinite;
          transform-origin: center;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Lens shimmer */
        .lens-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* CTA button */
        .cta-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(201,169,110,0.5);
          transition: border-color 0.3s, color 0.3s;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #c9a96e, #a07840);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { border-color: #c9a96e; color: #2f4034; }
        .cta-btn span { position: relative; z-index: 1; }

        /* Scroll indicator */
        .scroll-dot {
          animation: scrollBounce 2s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }

        /* Stats counter */
        .stat-item {
          border-left: 1px solid rgba(201,169,110,0.3);
        }
      `}</style>

      <section className="hero-root grain relative min-h-screen bg-[#2f4034] flex items-center overflow-hidden">

        {/* ── Background radial glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/[0.06] blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[100px]" />
        </div>

        {/* ── Grid lines (decorative) ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px'}}>
        </div>

        <div className="relative z-10 w-full  px-4 sm:px-10 lg:px-16 py-15 md:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 min-h-screen lg:min-h-0 lg:py-15">

            {/* ── LEFT — Text Content ── */}
            <div className="flex-1 text-white">

              {/* Eyebrow */}
              <div className={`reveal ${loaded ? "show" : ""} flex items-center gap-3 mb-8`}>
                <div className="w-6 h-px bg-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-medium">
                  Wedding Storytelling
                </span>
              </div>

              {/* Headline */}
              <h1 className={`reveal delay-1 ${loaded ? "show" : ""} display-font leading-[0.9] mb-6`}>
                <span className="block text-[clamp(3.5rem,8vw,7.5rem)] font-light text-white/90 italic">
                Where  
                </span>
                <span className="block text-[clamp(3.8rem,9vw,8.5rem)] font-semibold accent-text">
                Love & Art
                </span>
                <span className="block text-[clamp(3.5rem,8vw,7.5rem)] font-light text-white/90 italic">
                Intertwine.
                </span>
              </h1>

              {/* Divider */}
              <div className={`divider-line ${loaded ? "show" : ""} mb-8`} />

              {/* Subtext */}
              <p className={`reveal delay-2 ${loaded ? "show" : ""} text-white/60 text-sm sm:text-base leading-relaxed max-w-md font-light tracking-wide`}>
                Where light meets emotion — crafting timeless images that breathe
                life into your most precious memories.
              </p>

              {/* CTAs */}
              <div className={`reveal delay-3 ${loaded ? "show" : ""} flex flex-wrap gap-4 mt-10`}>
               
              
              </div>

              {/* Stats */}
              <div className={`reveal delay-4 ${loaded ? "show" : ""} flex gap-0 mt-14`}>
                {[
                  { num: "12+", label: "Years Experience" },
                  { num: "3.4K", label: "Sessions Shot" },
                  { num: "98%", label: "Client Delight" },
                ].map((s, i) => (
                  <div key={i} className={`${i!=0&&'stat-item'} pl-6 pr-8 first:border-l-0 first:pl-05 `}>
                    <div className="display-font text-[clamp(1.6rem,3vw,2.2rem)] font-semibold accent-text leading-none ">{s.num}</div>
                    <div className="text-white/55 text-xs tracking-wider mt-1 uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Camera Illustration ── */}
            <div className={`reveal-right delay-cam ${loaded ? "show" : ""} flex-1 flex items-center justify-center relative`}>

              {/* Outer decorative ring */}
              <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/10" />
              <div className="absolute w-[380px] h-[380px] sm:w-[470px] sm:h-[470px] rounded-full border border-white/5" />

              {/* Camera SVG */}
              <svg
                viewBox="0 0 480 480"
                className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] cam-glow"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Definitions */}
                <defs>
                  <radialGradient id="lensGrad" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#26342b"/>
                    <stop offset="40%" stopColor="#161f1a"/>
                    <stop offset="100%" stopColor="#0a0d0b"/>
                  </radialGradient>
                  <radialGradient id="lensShine" cx="35%" cy="30%" r="40%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22"/>
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="innerLens" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10160f"/>
                    <stop offset="60%" stopColor="#0a0d0a"/>
                    <stop offset="100%" stopColor="#040504"/>
                  </radialGradient>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#243027"/>
                    <stop offset="50%" stopColor="#16201a"/>
                    <stop offset="100%" stopColor="#0c120e"/>
                  </linearGradient>
                  <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff"/>
                    <stop offset="50%" stopColor="#d9e3da"/>
                    <stop offset="100%" stopColor="#a9bfae"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                {/* Camera body */}
                <rect x="60" y="130" width="360" height="250" rx="24" fill="url(#bodyGrad)" />
                <rect x="60" y="130" width="360" height="250" rx="24" stroke="url(#goldEdge)" strokeWidth="1" strokeOpacity="0.3"/>

                {/* Top grip */}
                <rect x="100" y="100" width="140" height="36" rx="8" fill="#16201a" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.35"/>

                {/* Shutter button */}
                <circle cx="195" cy="108" r="14" fill="#1a241d" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.55"/>
                <circle cx="195" cy="108" r="8" fill="#c9a96e" opacity="0.75"/>

                {/* Mode dial */}
                <circle cx="325" cy="115" r="20" fill="#1a241d" stroke="#c9a96e" strokeWidth="0.8" strokeOpacity="0.45"/>
                <circle cx="325" cy="115" r="3" fill="#c9a96e" opacity="0.65"/>
                {[0,45,90,135,180,225,270,315].map((deg, i) => {
                  const r = 13;
                  const rad = (deg * Math.PI) / 180;
                  const x = 325 + r * Math.cos(rad);
                  const y = 115 + r * Math.sin(rad);
                  return <circle key={i} cx={x} cy={y} r="1.5" fill="#c9a96e" opacity="0.4"/>;
                })}

                {/* Viewfinder */}
                <rect x="330" y="145" width="60" height="40" rx="4" fill="#0a0d0a" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.35"/>
                <rect x="336" y="151" width="48" height="28" rx="2" fill="#0a0d10" opacity="0.8"/>

                {/* Hot shoe */}
                <rect x="200" y="128" width="50" height="6" rx="2" fill="#1a241d" stroke="#c9a96e" strokeWidth="0.3" strokeOpacity="0.35"/>

                {/* ── Main Lens ── */}
                {/* Outer barrel */}
                <circle cx="230" cy="270" r="130" fill="#10160f" stroke="url(#goldEdge)" strokeWidth="1.5" strokeOpacity="0.5"/>
                <circle cx="230" cy="270" r="122" fill="#0c100d" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15"/>

                {/* Focus ring */}
                <circle cx="230" cy="270" r="115" fill="none" stroke="#ffffff" strokeWidth="8" strokeOpacity="0.05"
                  strokeDasharray="6 10"/>

                {/* Aperture blades — spinning */}
                <g className="aperture-spin">
                  {[0,40,80,120,160,200,240,280,320].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x1 = 230 + 70 * Math.cos(rad);
                    const y1 = 270 + 70 * Math.sin(rad);
                    const x2 = 230 + 95 * Math.cos(rad + 0.6);
                    const y2 = 270 + 95 * Math.sin(rad + 0.6);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.18"/>
                    );
                  })}
                </g>

                {/* Middle rings */}
                <circle cx="230" cy="270" r="105" fill="url(#lensGrad)" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3"/>
                <circle cx="230" cy="270" r="98" fill="url(#lensGrad)" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2"/>

                {/* Inner lens */}
                <circle cx="230" cy="270" r="80" fill="url(#innerLens)"/>
                <circle cx="230" cy="270" r="80" stroke="url(#goldEdge)" strokeWidth="1.5" strokeOpacity="0.4"/>

                {/* Lens depth rings */}
                <circle cx="230" cy="270" r="68" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1"/>
                <circle cx="230" cy="270" r="55" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15"/>
                <circle cx="230" cy="270" r="40" fill="#03130A"/>
                <circle cx="230" cy="270" r="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3"/>

                {/* Pupil */}
                <circle cx="230" cy="270" r="28" fill="#010a04"/>
                <circle cx="230" cy="270" r="20" fill="#000401"/>

                {/* Lens shine */}
                <circle cx="230" cy="270" r="105" fill="url(#lensShine)" className="lens-shimmer"/>

                {/* Highlight dot */}
                <circle cx="208" cy="248" r="8" fill="white" opacity="0.08"/>
                <circle cx="204" cy="244" r="4" fill="white" opacity="0.15"/>

                {/* Lens text ring */}
                <circle cx="230" cy="270" r="112" fill="none" stroke="none"/>
                <text fontSize="7" fill="#c9a96e" opacity="0.45" fontFamily="Montserrat, sans-serif" letterSpacing="3">
                  <textPath href="#lensTextPath">
                    SHIVEYE WEDDING · MADE BY LIGHT · ∞ — 0.45m
                  </textPath>
                </text>
                <path id="lensTextPath" d="M 230 158 m -112,0 a 112,112 0 1,1 224,0 a 112,112 0 1,1 -224,0" fill="none"/>

                {/* Camera right panel details */}
                <rect x="390" y="200" width="25" height="50" rx="4" fill="#121a14" stroke="#c9a96e" strokeWidth="0.4" strokeOpacity="0.25"/>
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x="395" y={207 + i * 9} width="15" height="2" rx="1" fill="#c9a96e" opacity="0.3"/>
                ))}

                {/* SD card slot */}
                <rect x="62" y="280" width="12" height="24" rx="2" fill="#0a0d0a" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.3"/>

              </svg>

              {/* Floating badge */}
              <div className="absolute bottom-4 right-8 sm:right-4 bg-[#1c2620]/80 backdrop-blur-md border border-[#c9a96e]/25 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#c9a96e] animate-pulse" />
                  <div>
                    <p className="text-white/85 text-xs tracking-widest uppercase">Available</p>
                    <p className="text-[#c9a96e] text-xs tracking-wider mt-0.5">For Booking 2026</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

         
        </div>
      </section>
    </>
  );
}