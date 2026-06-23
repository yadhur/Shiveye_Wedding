import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const portfolioImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    category: "Wedding",
    title: "Golden Vows",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
    category: "Portrait",
    title: "Urban Soul",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Landscape",
    title: "Mountain Echo",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1537202108838-e7072bad1927?w=800&q=80",
    category: "Wedding",
    title: "Eternal Bloom",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    category: "Portrait",
    title: "Quiet Storm",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
    category: "Landscape",
    title: "Last Light",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1562524895-e0cd52686408?w=800&q=80",
    category: "Commercial",
    title: "The Detail",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    category: "Commercial",
    title: "Through The Lens",
  },
];

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "3.2K", label: "Sessions Shot" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2000", label: "Working since" },
];

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ""));
  const suffix = end.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = numericEnd / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericEnd, duration]);

  return (
    <span ref={ref}>
      {count % 1 === 0 ? count : count.toFixed(1)}
      {suffix}
    </span>
  );
}

function AboutUs() {
  const containerRef = useRef(null);
  const [sliderX, setSliderX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);

  // Auto slider
  // useEffect(() => {
  //   if (isPaused) return;
  //   const totalWidth = portfolioImages.length * 340;
  //   const interval = setInterval(() => {
  //     setSliderX((prev) => {
  //       const next = prev - 1.2;
  //       return next <= -totalWidth / 2 ? 0 : next;
  //     });
  //   }, 16);
  //   return () => clearInterval(interval);
  // }, [isPaused]);

  const doubled = [...portfolioImages, ...portfolioImages];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#2f4034] text-white font-sans overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .mono { font-family: 'Montserrat', sans-serif; }
        .grain::after {
          content: '';
          position: fixed;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.035;
          z-index: 9999;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; }
      `}</style>

      <div className="grain" />

    <Navbar />

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1800&q=90"
            alt="Hero"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45)" }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-center px-16 md:px-28"
        >
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mono text-[#c8a96e] text-xs tracking-[0.4em] mb-6 uppercase"
          >
            Professional Photographer
          </motion.div>

          <motion.h1
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight"
          >
            Shiveye
          </motion.h1>

          <motion.p
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mono text-gray-400 text-sm tracking-wider mt-8 max-w-sm font-light leading-relaxed"
          >
            Capturing the ephemeral moments that define a lifetime. Based in New York, shooting worldwide.
          </motion.p>

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#about"
              className="mono text-xs tracking-[0.3em] uppercase border border-[#c8a96e] text-[#c8a96e] px-8 py-3 hover:bg-[#c8a96e] hover:text-black transition-all duration-300"
            >
              Discover More
            </a>
            <a href="#portfolio" className="mono text-xs tracking-[0.25em] text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3">
              <span className="w-10 h-px bg-gray-600" />
              View Portfolio
            </a>
          </motion.div>
        </motion.div>

        {/* Side label */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gray-600" />
          <div className="mono text-[10px] tracking-[0.4em] text-gray-500 rotate-90 whitespace-nowrap">
            SCROLL DOWN
          </div>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-12 right-16 mono text-[11px] text-gray-500 tracking-widest">
          01 / 03
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-8 md:px-20 lg:px-32 relative">
        {/* Decorative */}
        <div className="absolute top-20 right-10 text-[200px] font-light text-white/[0.02] select-none leading-none pointer-events-none">
          ABOUT
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mono text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase mb-4">
              Who Am I
            </div>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8">
              Crafting Stories
              <br />
              <span className="italic text-gray-400">Through Light</span>
            </h2>
            <div className="w-12 h-px bg-[#c8a96e] mb-8" />
            <p className="mono text-gray-400 text-sm leading-loose font-light mb-6">
              The long story short is that I'm just a person lucky enough to pick up a camera. How that went down is quite a tale — one that began on the streets of New York and has taken me to six continents, three wars, and more weddings than I can count.
            </p>
            <p className="mono text-gray-500 text-sm leading-loose font-light mb-10">
              What I love every day is something that I'll always cherish and be forever grateful for. Photography isn't just what I do — it's how I see the world, frame it, and make sense of the beautiful chaos within it.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="border-l-2 border-[#c8a96e]/40 pl-4"
                >
                  <div className="text-3xl font-light text-[#c8a96e]">
                    <CountUp end={stat.value} />
                  </div>
                  <div className="mono text-[10px] tracking-widest text-gray-500 uppercase mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            
          </motion.div>
        </div>

        {/* Services row */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto mt-28 grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-800"
        >
          {[
            { icon: "◈", label: "Wedding", desc: "Timeless love stories" },
            { icon: "◉", label: "Portrait", desc: "The soul unguarded" },
            { icon: "◫", label: "Landscape", desc: "Earth's raw poetry" },
            { icon: "◬", label: "Commercial", desc: "Vision that sells" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ backgroundColor: "rgba(200,169,110,0.05)" }}
              className="p-10 border-r border-gray-800 last:border-r-0 transition-colors duration-300 group cursor-pointer"
            >
              <div className="text-2xl text-[#c8a96e] mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {s.icon}
              </div>
              <div className="text-xl font-light mb-2">{s.label}</div>
              <div className="mono text-[11px] text-gray-500 tracking-wider">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div> */}
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 overflow-hidden">
        <div className="px-8 md:px-20 lg:px-32 mb-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mono text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase mb-4"
            >
              Selected Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-light leading-tight"
            >
              My Portfolio
              <br />
              <span className="italic text-gray-400">Collection</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="mono text-xs tracking-[0.3em] uppercase border border-gray-700 text-gray-400 px-8 py-3 hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all duration-300 self-start md:self-auto"
          >
            View All Work
          </motion.a>
        </div>

        {/* Auto-sliding strip */}
        <div
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-5"
            style={{ x: sliderX, width: "max-content" }}
            transition={{ type: "tween" }}
          >
            {doubled.map((img, i) => (
              <motion.div
                key={`${img.id}-${i}`}
                className="relative flex-shrink-0 w-[300px] h-[420px] overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "brightness(0.8) grayscale(20%)" }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="mono text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase mb-2">
                    {img.category}
                  </div>
                  <div className="text-2xl font-light">{img.title}</div>
                  <div className="w-8 h-px bg-[#c8a96e] mt-3" />
                </div>
                {/* Category tag */}
                <div className="absolute top-4 left-4 mono text-[9px] tracking-[0.3em] text-gray-300 uppercase bg-black/40 backdrop-blur-sm px-3 py-1">
                  {img.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second strip - reverse */}
        <div
          className="relative overflow-hidden py-4 mt-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-5"
            style={{ x: -sliderX, width: "max-content" }}
            transition={{ type: "tween" }}
          >
            {[...doubled].reverse().map((img, i) => (
              <motion.div
                key={`rev-${img.id}-${i}`}
                className="relative flex-shrink-0 w-[220px] h-[280px] overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "brightness(0.7) grayscale(40%)" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <div className="text-lg font-light">{img.title}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f7f7f7]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #c8a96e 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="mono text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase mb-6">
            Let's Create Together
          </div>
          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8 text-black">
            Have a Project
            <br />
            <span className="italic text-gray-800">in Mind?</span>
          </h2>
          <p className="mono text-gray-500 text-sm font-light leading-loose mb-12">
            Every great image begins with a conversation. Reach out and let's craft something extraordinary together.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mono text-sm tracking-[0.3em] uppercase bg-[#c8a96e] text-black px-12 py-4 inline-block font-medium hover:bg-white transition-colors duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>

    <Footer />
    </div>
  );
}

export default AboutUs;