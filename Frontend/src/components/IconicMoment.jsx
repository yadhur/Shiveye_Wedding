const IMAGES = [
  "/wedding/10.webp",
  "/pre-wedding/32.webp",
  "/wedding/23.webp",
  "/pre-wedding/22.webp",
  "/wedding/15.webp",
  "/pre-wedding/20.webp",
  "/wedding/06.webp",
  null,
  "/pre-wedding/23.webp",
  "/wedding/17.webp",
  "/pre-wedding/10.webp",
  "/wedding/13.webp",
  "/pre-wedding/19.webp",
  "/wedding/11.webp",
  "/pre-wedding/14.webp",
];

export default function IconicMoments() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500&display=swap');

        .im-img {
          transition: transform 0.5s ease;
          will-change: transform;
          backface-visibility: hidden;

          
        }

        .im-tile:hover .im-img {
          transform: scale(1.08);
        }

        .im-quote-mark {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <section className="bg-[#faf8f4] sm:py-2">
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[5px] sm:gap-3">
          {IMAGES.map((src, i) => {
            if (src === null) {
              return (
                <div
                  key={i}
                  className="hidden sm:flex flex-col items-center justify-center bg-[#faf8f4] aspect-[3/4] sm:aspect-square lg:aspect-[3/4]"
                >
                  <p
                    className="text-[#5c5648] text-sm sm:text-base italic tracking-wide mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    some of the most
                  </p>

                  <h2 className="im-quote-mark text-[#2f4034] text-4xl sm:text-5xl italic font-semibold leading-none my-1">
                    &ldquo;
                    <span className="text-[#c9a96e]">ICONIC</span>
                    &rdquo;
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
                className="im-tile relative overflow-hidden aspect-[3/4] sm:aspect-square lg:aspect-[3/4] cursor-pointer group"
              >
                <img
                  src={`${import.meta.env.VITE_S3_BASE_URL}${src}`}
                  alt="Wedding moment"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  width={1200}
                  height={800}
                  className="im-img absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-[#2f4034]/0 group-hover:bg-[#2f4034]/15 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}