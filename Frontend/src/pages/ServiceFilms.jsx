import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SERVICE_FILMS  from "../data/serviceFilms.json";

// ─────────────────────────────────────────────
// FILMS CONFIG
// Videos live in public/films/<service>/<filename>
// and are referenced as static URL strings — same
// pattern as ServiceGallery's photos in public/images/.
//
// Each entry needs:
//   src    — path to the video file (mp4 recommended)
//   poster — thumbnail shown before play (can be a
//            still from the video or a photo)
//   name   — couple / subject name shown on the slate
//   event  — event type · location label
//   quote  — short pull-quote shown above the slider
// ─────────────────────────────────────────────
const FILMS = SERVICE_FILMS;

// ─────────────────────────────────────────────
// VIDEO CARD
// ─────────────────────────────────────────────
function ServiceFilmsCard({ data, isActive }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Pause + reset when this card loses focus (slide changes)
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setRevealed(false);
    }
  }, [isActive]);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setPlaying(true);
    setTimeout(() => setRevealed(true), 60);
  };

  const handlePause  = () => setPlaying(false);
  const handleEnded  = () => {
    setPlaying(false);
    setRevealed(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div className="tm-card relative w-full aspect-video overflow-hidden rounded-sm bg-[#1c2620]">
      <video
        ref={videoRef}
        src={data.src}
        poster={import.meta.env.VITE_S3_BASE_URL+data.poster}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        onPause={handlePause}
        onEnded={handleEnded}
        controls={playing}
        // audio on by default — no muted attribute
      />

      {/* ── SLATE OVERLAY ── */}
      <div
        className={`tm-slate absolute inset-0 flex flex-col justify-between p-6 sm:p-9 pointer-events-none transition-all duration-700 ${
          revealed ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1310]/70 via-transparent to-[#0d1310]/85" />

        {/* Top — film slate label */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="w-5 h-px bg-[#c9a96e]/70" />
          <span
            className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            Client Film
          </span>
        </div>

        {/* Bottom — name & event */}
        <div className="relative z-10">
          <h3
            className="text-white text-2xl sm:text-3xl font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {data.name}
          </h3>
          <p
            className="text-[#c9a96e] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mt-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            {data.event}
          </p>
        </div>
      </div>

      {/* ── PLAY BUTTON ── */}
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label={`Play ${data.name}'s film`}
          className="absolute inset-0 z-20 flex items-center justify-center group"
        >
          <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[2px] bg-white/5 group-hover:bg-[#c9a96e] group-hover:border-[#c9a96e] transition-all duration-300">
            <Icon
              icon="ph:play-fill"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#0d1310] translate-x-px transition-colors duration-300"
            />
          </span>
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function ServiceFilms() {
  const { service } = useParams();
  const data = FILMS[service] ?? FILMS.wedding;
  const items = data.items;

  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  // Reset to first slide when service changes via route
  useEffect(() => { setIndex(0); }, [service]);

  const goTo = (i) => setIndex((i + items.length) % items.length);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&display=swap');

        .tm-root { font-family: 'Montserrat', sans-serif; }
        .tm-quote-mark { font-family: 'Cormorant Garamond', serif; }

        .tm-card video::-webkit-media-controls-panel {
          background: linear-gradient(transparent, rgba(0,0,0,0.5));
        }

        .tm-dot {
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background-color 0.4s ease;
        }

        .tm-fade-in {
          animation: tmFadeIn 0.6s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes tmFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sg-grain::after {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }
      `}</style>

      <Navbar />

      <main className="tm-root min-h-screen bg-[#2f4034]">

        {/* ── HERO HEADER — same pattern as ServiceGallery ── */}
        <section className="sg-grain relative bg-[#2f4034] px-6 sm:px-10 lg:px-16 pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#c9a96e]" />
              <span
                className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                {data.tag}
              </span>
            </div>

            <h1
              className="text-white font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(52px, 9vw, 110px)",
                letterSpacing: "-0.02em",
              }}
            >
              {data.title}
              <span
                className="italic text-[#c9a96e] ml-4"
                style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
              >
                {data.sub}
              </span>
            </h1>

            <div className="w-14 h-px bg-[#c9a96e] mt-7 mb-7" />

            <p
              className="text-white/55 text-sm sm:text-base leading-relaxed max-w-xl font-light"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {data.desc}
            </p>

            <p
              className="text-white/25 text-[10px] tracking-[0.4em] uppercase mt-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {items.length} films
            </p>
          </div>
        </section>

        {/* ── ACTIVE QUOTE ── */}
        <div
          className="max-w-3xl mx-auto text-center px-6 sm:px-10 pt-14 pb-10 sm:pb-14"
          key={`quote-${index}`}
        >
          <p
            className="tm-fade-in tm-quote-mark text-white/75 italic leading-relaxed"
            style={{ fontSize: "clamp(18px, 2.4vw, 26px)" }}
          >
            &ldquo;{items[index].quote}&rdquo;
          </p>
        </div>

        {/* ── VIDEO SLIDER ── */}
        <div className="px-4 sm:px-10 lg:px-16 pb-24">
          <div className="relative max-w-4xl mx-auto">

            {/* Track */}
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {items.map((t, i) => (
                  <div key={t.id} className="w-full flex-shrink-0 px-1">
                    <ServiceFilmsCard data={t} isActive={i === index} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── NAV ARROWS ── */}
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous film"
              className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-[#2f4034] hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 bg-[#2f4034]/60 backdrop-blur-sm"
            >
              <Icon icon="ph:caret-left-light" className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next film"
              className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-0 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-[#2f4034] hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 bg-[#2f4034]/60 backdrop-blur-sm"
            >
              <Icon icon="ph:caret-right-light" className="w-4 h-4" />
            </button>
          </div>

          {/* ── DOTS ── */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {items.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                aria-label={`Go to ${t.name}'s film`}
                className={`tm-dot h-1.5 rounded-full ${
                  i === index ? "w-8 bg-[#c9a96e]" : "w-1.5 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          {/* ── COUNTER ── */}
          <p
            className="text-center text-white/30 text-[10px] tracking-[0.4em] uppercase mt-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}