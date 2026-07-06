import { useState, useEffect, useRef } from "react";

const IMAGES = [
  "/images/wedding/10.webp",
  "/images/pre-wedding/32.webp",
  "/images/wedding/23.webp",
  "/images/pre-wedding/22.webp",
  "/images/wedding/15.webp",
  "/images/pre-wedding/20.webp",
  "/images/wedding/19.webp",
  null, // center text block
  "/images/pre-wedding/23.webp",
  "/images/wedding/17.webp",
  "/images/pre-wedding/10.webp",
  "/images/wedding/13.webp",
  "/images/pre-wedding/19.webp",
  "/images/wedding/11.webp",
  "/images/pre-wedding/14.webp",
];

export default function IconicMoments() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500&display=swap');

        .im-tile {
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .im-tile.in { opacity: 1; transform: scale(1); }

        .im-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
        }
        .im-tile:hover .im-img {
          transform: scale(1.08);
        }

        .im-quote-mark {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <section ref={ref} className="bg-[#faf8f4] sm:py-2 ">

        {/* Grid: 5 columns on desktop, fewer on smaller screens */}
        <div className=" mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[5px] sm:gap-3">
          {IMAGES.map((src, i) => {
            const delay = `${(i % 5) * 60 + Math.floor(i / 5) * 40}ms`;

            if (src === null) {
              // ── CENTER TEXT TILE ──
              return (
                <div
                  key={i}
                  className={`im-tile ${visible ? "in" : ""} hidden sm:flex flex-col items-center justify-center bg-[#faf8f4] aspect-[3/4] sm:aspect-square lg:aspect-[3/4]`}
                  style={{ transitionDelay: delay }}
                >
                  <p
                    className="text-[#5c5648] text-sm sm:text-base italic tracking-wide mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    some of the most
                  </p>
                  <h2
                    className="im-quote-mark text-[#2f4034] text-4xl sm:text-5xl italic font-semibold leading-none my-1"
                  >
                    &ldquo;<span className="text-[#c9a96e]">ICONIC</span>&rdquo;
                  </h2>
                  <p
                    className="text-[#5c5648] text-sm sm:text-base italic tracking-wide mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    wedding images
                  </p>
                </div>
              );
            }

            return (
              <div
                key={i}
                className={`im-tile ${visible ? "in" : ""} relative overflow-hidden aspect-[3/4] sm:aspect-square lg:aspect-[3/4] cursor-pointer group`}
                style={{ transitionDelay: delay }}
              >
                <img
                  src={src}
                  alt="Wedding moment"
                  className="im-img absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gold hover veil */}
                <div className="absolute inset-0 bg-[#2f4034]/0 group-hover:bg-[#2f4034]/15 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}