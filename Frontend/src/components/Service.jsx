import React from "react";
import { useNavigate } from "react-router-dom";

function Service() {
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      label: "Wedding",
      sub: "Photo",
      tag: "Sacred Vows",
      desc: "Beautifully documenting the sacred union of two souls.",
      image: "/wedding/28.webp",
      link: "/service-gallery/wedding",
    },
    {
      id: 2,
      label: "Wedding",
      sub: "Films",
      tag: "Joyful Celebration",
      desc: "Moments of laughter, dance, and unforgettable memories.",
      image: "/wedding/13.webp",
      link: "/service-films/wedding",
    },
    {
      id: 3,
      label: "Pre Wedding",
      sub: "Photo",
      tag: "Timeless Moments",
      desc: "Capturing the love, emotion, and beauty of your most cherished day.",
      image: "/pre-wedding/37.webp",
      link: "/service-gallery/pre-wedding",
    },

    {
      id: 4,
      label: "Pre Wedding",
      sub: "Films",
      tag: "Timeless Moments",
      desc: "Capturing the love, emotion, and beauty of your most cherished day.",
      image: "/pre-wedding/36.webp",
      link: "/service-films/pre-wedding",
    },
  ];


  return (
    <div
      className="bg-[#faf8f4] "
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <section className="px-8 sm:px-16 lg:px-24 pt-24 pb-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            {/* Eyebrow */}
            <p
              className="text-[#c8a96e] text-[10px] tracking-[0.55em] uppercase mb-5 flex items-center gap-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              <span className="inline-block w-6 h-px bg-[#c8a96e]" />
              What We Offer
            </p>

            {/* Heading */}
            <div className="svc-heading-reveal">
              <h1
                className="text-[#1a1814] font-light leading-none"
                style={{
                  fontSize: "clamp(64px, 10vw, 128px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span>Our </span>
                <span className="italic text-[#c8a96e]">Services</span>
              </h1>
            </div>
          </div>

          {/* Right side descriptor */}
          <div className="max-w-xs mb-2">
            <div className="w-10 h-px bg-[#c8a96e] mb-5" />
            <p
              className="text-[#6b6459] text-sm leading-loose"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              Scroll to explore our full range of photography services — each
              crafted with intention and artistry.
            </p>
          </div>
        </div>

        {/* Thin separator */}
        <div className="mt-12 w-full h-px bg-gradient-to-r from-[#c8a96e]/40 via-[#c8a96e]/10 to-transparent" />
      </section>
      <section className="px-8 sm:px-16 lg:px-24 pb-24">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
    {items.map((item) => (
      <div
        key={item.id}
        className="svc-card gallery-item relative cursor-pointer group"
        onClick={() => navigate(item.link)}
      >
        <div className="svc-card-img absolute inset-0 overflow-hidden">
          <img
            src={import.meta.env.VITE_S3_BASE_URL+item.image}
            alt={`${item.label} ${item.sub}`}
            loading={"eager"}
            fetchPriority={"high"}
            decoding="sync"
            width={400}
            height={500}
            draggable={false}
            className="w-full h-full object-cover select-none"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1814]/80" />
        <div className="absolute inset-0 bg-[#c8a96e]/0 group-hover:bg-[#c8a96e]/10 transition-all duration-500" />

        <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5">
          <span
            className="text-[#c8a96e] text-[9px] tracking-[0.5em] uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
            }}
          >
            0{item.id}
          </span>

          <span className="w-5 h-px bg-[#c8a96e]/60" />

          <span
            className="text-white/50 text-[9px] tracking-[0.35em] uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 200,
            }}
          >
            {item.tag}
          </span>
        </div>

        <div className="absolute top-5 right-5 z-10 w-5 h-5 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
          <span className="absolute top-0 right-0 w-full h-px bg-[#c8a96e]" />
          <span className="absolute top-0 right-0 w-px h-full bg-[#c8a96e]" />
        </div>

        <div className="item-content">
          <div className="w-8 h-px bg-[#c8a96e] mb-4 group-hover:w-14 transition-all duration-500" />

          <h2
            className="text-white font-light leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 3.5vw, 46px)",
              letterSpacing: "-0.02em",
              fontWeight: 300,
            }}
          >
            {item.label}
            <span className="italic text-white/60 ml-2">
              {item.sub}
            </span>
          </h2>

          <p
            className="text-white/50 text-[11px] leading-relaxed mt-3 max-w-[280px] translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
            }}
          >
            {item.desc}
          </p>

          <div
            className="flex items-center gap-2 mt-4 text-[#c8a96e] text-[9px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
            }}
          >
            <span>Explore</span>
            <span className="inline-block w-5 h-px bg-[#c8a96e]" />
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
      .gallery-item {
        width: 100%;
        height: 500px;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        content-visibility: auto;
        contain: layout paint style;
      }

      .svc-card-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
      }

      .item-content {
        position: absolute;
        bottom: 30px;
        left: 30px;
        z-index: 1;
      }

      @media (max-width: 640px) {
        .gallery-item {
          width: 100%;
          max-width: 320px;
          height: 420px;
        }
      }
    `}</style>
  );
}

export default Service;
