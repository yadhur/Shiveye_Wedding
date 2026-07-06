import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya & Rohan",
    event: "Wedding · Udaipur",
    quote:
      "Shiveye didn't just photograph our wedding — they understood it. Every frame feels like it remembers something we'd forgotten we felt. Seeing those images for the first time, we were completely speechless.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya & Aditya",
    event: "Engagement · Goa",
    quote:
      "We've watched our film more times than we'll admit. It doesn't feel like a video of our day — it feels like our day, again. The way they captured every little moment was just extraordinary.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Meera & Karan",
    event: "Wedding · Jaipur",
    quote:
      "From the first call to the final reel, it never felt like a shoot. It felt like someone we trusted was simply there, quietly paying attention to everything that mattered.",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "Sara & Vikram",
    event: "Reception · Mumbai",
    quote:
      "Months later, friends still ask who shot our wedding. That's the real review — people stopping mid-scroll, every single time they see the photographs. We couldn't be more grateful.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    rating: 5,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} icon="ph:star-fill" className="w-3 h-3 text-[#c9a96e]" />
      ))}
    </div>
  );
}

function TestimonialCard({ data, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`tm-card relative cursor-pointer transition-all duration-500 ${
        isActive ? "tm-card-active" : "tm-card-idle"
      }`}
    >
      {/* Quote mark — decorative */}
      <div className="tm-quote-deco" aria-hidden>&#8220;</div>

      {/* Review text */}
      <p
        className="tm-card-quote relative z-10 mt-5"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {data.quote}
      </p>

      {/* Divider */}
      <div className="w-10 h-px bg-[#c9a96e]/50 my-6" />

      {/* Client row */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Avatar */}
        <div className="tm-avatar-wrap">
          <img
            src={data.image}
            alt={data.name}
            className="tm-avatar-img"
            loading="lazy"
          />
        </div>

        {/* Name + event + stars */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-white text-lg sm:text-xl font-light leading-tight truncate"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {data.name}
          </h3>
          <p
            className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mt-1 mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            {data.event}
          </p>
          <StarRating count={data.rating} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const goTo = (i) => {
    setIndex((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&display=swap');

        .tm-root { font-family: 'Montserrat', sans-serif; }

        /* ── Card base ── */
        .tm-card {
          flex-shrink: 0;
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 40px 36px 36px;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          user-select: none;
        }
        .tm-card-active {
          background: rgba(200,169,110,0.07);
          border-color: rgba(200,169,110,0.25);
        }
        .tm-card-idle {
          opacity: 0.55;
        }

        /* Big decorative opening quote */
        .tm-quote-deco {
          position: absolute;
          top: -8px;
          left: 28px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          line-height: 1;
          color: rgba(200,169,110,0.12);
          pointer-events: none;
          user-select: none;
        }

        /* Review text */
        .tm-card-quote {
          color: rgba(255,255,255,0.82);
          font-size: clamp(17px, 2vw, 22px);
          font-style: italic;
          line-height: 1.65;
          font-weight: 300;
        }

        /* Avatar */
        .tm-avatar-wrap {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(200,169,110,0.5);
          overflow: hidden;
          background: rgba(200,169,110,0.1);
        }
        .tm-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Dots */
        .tm-dot {
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background-color 0.4s ease;
        }

        /* Quote re-animation on slide change */
        .tm-fade-in {
          animation: tmFadeIn 0.55s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes tmFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Arrows */
        .tm-arrow {
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        .tm-arrow:hover {
          background: #c9a96e;
          border-color: #c9a96e;
          color: #1a1814;
        }
      `}</style>

      <Navbar />

      <main className="tm-root min-h-screen bg-[#2f4034] overflow-hidden">

        {/* ── HEADER ── */}
        <section className="pt-28 pb-16 px-4 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase">
                In Their Words
              </span>
              <span className="w-6 h-px bg-[#c9a96e]" />
            </div>

            <h1
              className="text-white font-light leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(44px, 6vw, 76px)",
                letterSpacing: "-0.02em",
              }}
            >
              What our{" "}
              <span className="italic text-[#c9a96e]">clients</span> say
            </h1>

            <p
              className="text-white/50 text-sm sm:text-base mt-6 leading-relaxed font-light max-w-xl mx-auto"
            >
              Real words from real couples — this is how they remember it.
            </p>
          </div>
        </section>

        {/* ── SLIDER ── */}
        <section className="pb-24 px-4 sm:px-10 lg:px-16">
          <div className="relative max-w-3xl mx-auto">

            {/* Track */}
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div key={t.id} className="w-full flex-shrink-0">
                    <TestimonialCard
                      data={t}
                      isActive={i === index}
                      onClick={() => goTo(i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── NAV ARROWS ── */}
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous"
              className="tm-arrow absolute -left-5 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white/60 bg-[#2f4034]/80 backdrop-blur-sm z-10"
            >
              <Icon icon="ph:caret-left-light" className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next"
              className="tm-arrow absolute -right-5 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white/60 bg-[#2f4034]/80 backdrop-blur-sm z-10"
            >
              <Icon icon="ph:caret-right-light" className="w-4 h-4" />
            </button>
          </div>

          {/* ── THUMBNAIL ROW — click to jump ── */}
          <div className="flex items-center justify-center gap-4 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                aria-label={`View ${t.name}'s review`}
                className={`relative transition-all duration-400 ${
                  i === index
                    ? "ring-2 ring-[#c9a96e] ring-offset-2 ring-offset-[#2f4034]"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{ borderRadius: "50%" }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover object-top"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* ── NAME + COUNTER ── */}
          <div key={`meta-${index}`} className="tm-fade-in text-center mt-5">
            <p
              className="text-white/70 text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {TESTIMONIALS[index].name}
            </p>
            <p
              className="text-white/25 text-[10px] tracking-[0.4em] uppercase mt-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </p>
          </div>

        </section>

        <Footer />
      </main>
    </>
  );
}