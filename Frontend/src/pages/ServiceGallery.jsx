import { useState, useMemo, useEffect } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import SERVICE_GALLERY  from "../data/serviceGallery.json";

// ─────────────────────────────────────────────
// PHOTO CONFIG
// width/height must match the ACTUAL pixel dimensions of each photo.
// Run this in your project root to get real dimensions quickly:
//
//   node -e "
//   const sharp = require('sharp'), fs = require('fs'), path = require('path');
//   const dir = './public/images/wedding';
//   Promise.all(fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).map(async f => {
//     const { width, height } = await sharp(path.join(dir, f)).metadata();
//     return \`{ src: '/images/wedding/\${f}', width: \${width}, height: \${height} },\`;
//   })).then(r => console.log(r.join('\n')));
//   "
//
// Paste the output in place of the placeholder entries below.
// ─────────────────────────────────────────────
const SERVICES = SERVICE_GALLERY;
     
  
/**
 * Reads the actual pixel dimensions from each photo by loading them
 * as Image objects in the browser. This ensures react-photo-album
 * always has the correct aspect ratio regardless of the placeholder
 * values in the config above — completely eliminates the "expanded /
 * distorted photo" problem without needing a build-time script.
 */
function useRealDimensions(photos) {
  const [resolved, setResolved] = useState(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      photos.map(
        (photo) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () =>
              resolve({ ...photo, width: img.naturalWidth, height: img.naturalHeight });
            img.onerror = () =>
              resolve(photo); // fallback to config values if load fails
            img.src = photo.src;
          })
      )
    ).then((result) => {
      if (!cancelled) setResolved(result);
    });

    return () => { cancelled = true; };
  }, [photos]);

  // While dimensions are loading, use config values so the grid
  // renders immediately (it'll re-layout once real dims arrive).
  return resolved ?? photos;
}

export default function ServiceGallery() {
  const { service } = useParams();
  const data = SERVICES[service] ?? SERVICES.wedding;

  // No shuffle — photos display in the order defined in SERVICES above.
  const configPhotos = data.photos;

  // Resolve real pixel dimensions from the browser — fixes distortion.
  const photos = useRealDimensions(configPhotos);

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&display=swap');

        .sg-root { font-family: 'Montserrat', sans-serif; }

        /* ── Photo hover overlay ── */
        .sg-photo-wrap {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        /* Critical — prevents any distortion regardless of dimension mismatch */
        .sg-photo-wrap img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), filter 0.5s ease;
        }
        .sg-photo-wrap:hover img {
          transform: scale(1.04);
          filter: brightness(0.82);
        }
        .sg-photo-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 18px;
          background: linear-gradient(to top, rgba(47,64,52,0.55) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .sg-photo-wrap:hover .sg-photo-overlay {
          opacity: 1;
        }
        .sg-photo-expand {
          width: 30px;
          height: 30px;
          border: 1px solid rgba(200,169,110,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
        }

        /* ── Lightbox brand colors ── */
        .yarl__root {
          --yarl__color_backdrop: rgba(15,20,17,0.97);
          --yarl__color_button: rgba(200,169,110,0.7);
          --yarl__color_button_active: #c8a96e;
        }
        .yarl__navigation_prev,
        .yarl__navigation_next {
          border: 1px solid rgba(200,169,110,0.3);
          border-radius: 0;
          padding: 12px;
        }

        /* ── Grain on hero ── */
        .sg-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="sg-root min-h-screen bg-[#faf8f4]">
        <Navbar />

        {/* ── HERO HEADER ── */}
        <section className="sg-grain relative bg-[#2f4034] px-6 sm:px-10 lg:px-16 pt-32  overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-4xl">
           

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
                className="italic text-[#c8a96e] ml-4"
                style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
              >
                {data.sub}
              </span>
            </h1>

            <div className="w-14 h-px bg-[#c8a96e] mt-7 mb-7" />

            <p
              className="text-white/55 text-sm sm:text-base leading-relaxed max-w-xl font-light"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {data.desc}
            </p>

           
          </div>
        </section>

        {/* ── GALLERY ── */}
<section className="px-1 sm:px-0 lg:px-0 py-10 sm:py-14 bg-[#2f4034]">
  <MasonryPhotoAlbum
    photos={photos}
    columns={(containerWidth) => {
      if (containerWidth < 480) return 1;
      if (containerWidth < 768) return 2;
      if (containerWidth < 1100) return 3;
      return 4;
    }}
    spacing={8}
    render={{
      // 1. Force the images to stay loaded up-front and prevent unmounting glitches
      image: ({ src, alt, sizes, className, style }) => (
        <img
          src={import.meta.env.VITE_S3_BASE_URL+src}
          alt={alt}
          sizes={sizes}
          className={className}
          style={style}
          loading="eager" // 👈 Forces all images to load in one shot instantly
        />
      ),
      // 2. Keep your existing wrapper click handler for the lightbox
      wrapper: ({ photo, layout, children, ...rest }) => (
        <div
          {...rest}
          className="sg-photo-wrap"
          onClick={() =>
            setLightboxIndex(photos.findIndex((p) => p.src === photo.src))
          }
        >
          {children}
        </div>
      ),
    }}
  />
</section>

        {/* ── LIGHTBOX ── */}
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={photos}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
          carousel={{ finite: false, preload: 2 }}
          styles={{ container: { backgroundColor: "rgba(15,20,17,0.97)" } }}
        />

        <Footer />
      </div>
    </>
  );
}