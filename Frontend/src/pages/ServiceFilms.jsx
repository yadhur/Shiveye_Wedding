import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya & Rohan",
    event: "Wedding · Udaipur",
    quote:
      "Shiveye didn't just photograph our wedding — they understood it. Every frame feels like it remembers something we'd forgotten we felt.",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
  },
  {
    id: 2,
    name: "Priya & Aditya",
    event: "Engagement · Goa",
    quote:
      "We've watched our film more times than we'll admit. It doesn't feel like a video of our day — it feels like our day, again.",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/coffee.mp4",
    poster:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
  },
  {
    id: 3,
    name: "Meera & Karan",
    event: "Wedding · Jaipur",
    quote:
      "From the first call to the final reel, it never felt like a shoot. It felt like someone we trusted was simply there, quietly paying attention.",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/morning-flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80",
  },
  {
    id: 4,
    name: "Sara & Vikram",
    event: "Reception · Mumbai",
    quote:
      "Months later, friends still ask who shot our wedding. That's the real review — people stopping mid-scroll, every single time.",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
  },
];

function ServiceFilmsCard({ data, isActive }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Pause + reset when this card scrolls out of focus
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
    // Slate lifts away just after playback begins
    setTimeout(() => setRevealed(true), 60);
  };

  const handlePause = () => setPlaying(false);
  const handleEnded = () => {
    setPlaying(false);
    setRevealed(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div className="tm-card relative w-full aspect-video overflow-hidden rounded-sm bg-[#1c2620]">
      <video
        ref={videoRef}
        src={data.video}
        poster={data.poster}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        onPause={handlePause}
        onEnded={handleEnded}
        controls={playing}
      />

      {/* ── SLATE OVERLAY — visible until played ── */}
      <div
        className={`tm-slate absolute inset-0 flex flex-col justify-between p-6 sm:p-9 pointer-events-none transition-all duration-700 ${
          revealed ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Top scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1310]/70 via-transparent to-[#0d1310]/85" />

        {/* Top row — corner mark, like a film slate */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="w-5 h-px bg-[#c9a96e]/70" />
          <span
            className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            Client Story
          </span>
        </div>

        {/* Bottom row — name & event, like a slate label */}
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

      {/* ── PLAY BUTTON — visible until played ── */}
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label={`Play ${data.name}'s testimonial`}
          className="absolute inset-0 z-20 flex items-center justify-center group"
        >
          <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[2px] bg-white/5 group-hover:bg-[#c9a96e] group-hover:border-[#c9a96e] transition-all duration-400">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#0d1310] translate-x-px transition-colors duration-400"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>  
  );
}

export default function ServiceFilms() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const goTo = (i) => {
    const next = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    setIndex(next);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&display=swap');

        .tm-root { font-family: 'Montserrat', sans-serif; }

        .tm-quote-mark {
          font-family: 'Cormorant Garamond', serif;
        }

        .tm-card video::-webkit-media-controls-panel {
          background: linear-gradient(transparent, rgba(0,0,0,0.4));
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
      `}</style>
    <Navbar />

      <section className="tm-root bg-[#2f4034] py-20 sm:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden">

        {/* ── HEADER ── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase">
              In Their Words
            </span>
            <span className="w-6 h-px bg-[#c9a96e]" />
          </div>

          <h2
            className="text-white font-light leading-[0.95]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.02em",
            }}
          >
            What our{" "}
            <span className="italic text-[#c9a96e]">clients</span> say
          </h2>

          <p className="text-white/55 text-sm sm:text-base mt-6 leading-relaxed font-light max-w-xl mx-auto">
            Not reviews — recollections. Press play and hear it the way they
            told it to us.
          </p>
        </div>

        {/* ── ACTIVE QUOTE ── */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 px-4" key={`quote-${index}`}>
          <p
            className="tm-fade-in tm-quote-mark text-white/80 italic leading-relaxed"
            style={{ fontSize: "clamp(18px, 2.4vw, 26px)" }}
          >
            “{TESTIMONIALS[index].quote}”
          </p>
        </div>

        {/* ── VIDEO SLIDER ── */}
        <div className="relative max-w-4xl mx-auto">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="w-full flex-shrink-0 px-1">
                <ServiceFilmsCard data={t} isActive={i === index} />
              </div>
            ))}
          </div>

          {/* ── NAV ARROWS ── */}
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-[#2f4034] hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 bg-[#2f4034]/60 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-0 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-[#2f4034] hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 bg-[#2f4034]/60 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── DOT / PROGRESS INDICATORS ── */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${t.name}'s testimonial`}
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
          {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </p>
      </section>
      <Footer />
    </>
  );
}