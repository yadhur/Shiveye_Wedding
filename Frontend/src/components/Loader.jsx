import { useState, useEffect, useRef } from "react";
import logo from "/images/logoLoading.png";

const TICKS = Array.from({ length: 11 }, (_, i) => i);

// Original step shape (target %, speed ms-per-%) — used to derive proportions
// so the same "fast-slow-fast" feel scales to any total duration.
const DEFAULT_STEPS = [
  { target: 18, speed: 38 },
  { target: 45, speed: 22 },
  { target: 67, speed: 48 },
  { target: 88, speed: 28 },
  { target: 100, speed: 18 },
];

// Total time the default steps take (initial delay + per-step time + pauses),
// used as the baseline to scale against when a custom duration is passed.
const INITIAL_DELAY = 650;
const STEP_PAUSE = 110;

function getDefaultTotalMs() {
  let total = INITIAL_DELAY;
  let prevTarget = 0;
  DEFAULT_STEPS.forEach(({ target, speed }, i) => {
    total += (target - prevTarget) * speed;
    if (i < DEFAULT_STEPS.length - 1) total += STEP_PAUSE;
    prevTarget = target;
  });
  return total;
}

const DEFAULT_TOTAL_MS = getDefaultTotalMs();

export default function Loader({ onComplete, duration }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const timerRef = useRef(null);

  // Run progress counter
  useEffect(() => {
    // Scale factor: if a custom duration is passed, speed everything
    // (initial delay, per-step speed, pauses) up/down proportionally
    // so the same easing "shape" plays out over the new total time.
    const scale = duration ? duration / DEFAULT_TOTAL_MS : 1;

    const initialDelay = INITIAL_DELAY * scale;
    const stepPause = STEP_PAUSE * scale;
    const steps = DEFAULT_STEPS.map((s) => ({
      target: s.target,
      speed: s.speed * scale,
    }));

    let p = 0;
    let si = 0;
    const tick = () => {
      if (si >= steps.length) return;
      const { target, speed } = steps[si];
      if (p < target) {
        p++;
        setProgress(p);
        timerRef.current = setTimeout(tick, speed);
      } else {
        si++;
        timerRef.current = setTimeout(tick, stepPause);
      }
    };
    timerRef.current = setTimeout(tick, initialDelay);
    return () => clearTimeout(timerRef.current);
  }, [duration]);

  // Exit when done
  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setExiting(true), 400);
    const t2 = setTimeout(() => { setGone(true); onComplete?.(); }, 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [progress]);

  if (gone) return null;

  return (
    <>
      {/* Google Fonts + minimal keyframes only (Tailwind can't handle @keyframes) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300&display=swap');

        .vk-rise    { animation: vk-rise 0.95s cubic-bezier(.22,1,.36,1) forwards; opacity: 0; transform: translateY(110%); }
        .vk-rise-v  { animation-delay: 0.28s; }
        .vk-rise-k  { animation-delay: 0.46s; }
        @keyframes vk-rise { to { opacity: 1; transform: translateY(0); } }

        .vk-grow    { animation: vk-grow 0.8s cubic-bezier(.22,1,.36,1) 0.9s forwards; width: 0; }
        @keyframes vk-grow { to { width: 185px; } }

        .vk-cfade   { animation: vk-cfade 0.5s ease forwards; opacity: 0; }
        @keyframes vk-cfade { to { opacity: 1; } }

        .vk-sfade   { animation: vk-sfade 0.8s ease 1.1s forwards; color: transparent; }
        @keyframes vk-sfade { to { color: rgba(255,255,255,0.30); } }

        .vk-pfade   { animation: vk-pfade 0.6s ease 0.75s forwards; opacity: 0; }
        @keyframes vk-pfade { to { opacity: 1; } }

        .vk-scan    { animation: vk-scan 2.4s ease-in-out infinite; }
        @keyframes vk-scan {
          0%   { transform: translateX(-65px); }
          100% { transform: translateX(320px); }
        }

        .vk-tip::after {
          content: '';
          position: absolute;
          right: -1.5px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 3px; border-radius: 50%;
          background: #c8a96e;
          box-shadow: 0 0 8px 3px rgba(200,169,110,.55), 0 0 22px 7px rgba(200,169,110,.22);
        }

        .vk-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── ROOT ── */}
      <div
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#2f4034] transition-all duration-[850ms] ease-in-out ${
          exiting ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >

        {/* Grain overlay */}
        <div className="vk-grain absolute inset-0 pointer-events-none opacity-[0.04]" />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(200,169,110,0.07) 0%, transparent 70%)" }}
        />

        {/* ── CORNER BRACKETS ── */}
        {/* Top-left */}
        <div className="vk-cfade absolute top-7 left-7 w-7 h-7 [animation-delay:0.2s]">
          <span className="absolute top-0 left-0 w-full h-px bg-[rgba(200,169,110,0.5)]" />
          <span className="absolute top-0 left-0 w-px h-full bg-[rgba(200,169,110,0.5)]" />
        </div>
        {/* Top-right */}
        <div className="vk-cfade absolute top-7 right-7 w-7 h-7 rotate-90 [animation-delay:0.3s]">
          <span className="absolute top-0 left-0 w-full h-px bg-[rgba(200,169,110,0.5)]" />
          <span className="absolute top-0 left-0 w-px h-full bg-[rgba(200,169,110,0.5)]" />
        </div>
        {/* Bottom-left */}
        <div className="vk-cfade absolute bottom-7 left-7 w-7 h-7 -rotate-90 [animation-delay:0.4s]">
          <span className="absolute top-0 left-0 w-full h-px bg-[rgba(200,169,110,0.5)]" />
          <span className="absolute top-0 left-0 w-px h-full bg-[rgba(200,169,110,0.5)]" />
        </div>
        {/* Bottom-right */}
        <div className="vk-cfade absolute bottom-7 right-7 w-7 h-7 rotate-180 [animation-delay:0.5s]">
          <span className="absolute top-0 left-0 w-full h-px bg-[rgba(200,169,110,0.5)]" />
          <span className="absolute top-0 left-0 w-px h-full bg-[rgba(200,169,110,0.5)]" />
        </div>

        {/* ── BRAND ── */}
        <div className="flex flex-col items-center mb-16">

          {/* Loader logo */}
          <div
            className="flex items-baseline overflow-hidden pb-1 leading-none tracking-[-0.03em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(88px,15vw,148px)" }}
          >
                           <img src={logo} alt="logo" className="w-50 h-50" />

          </div>

          {/* Gold divider */}
          <div
            className="vk-grow h-px my-3.5"
            style={{ background: "linear-gradient(90deg, transparent, #c8a96e 40%, transparent)" }}
          />

          {/* Subtitle */}
          <p
            className="vk-sfade font-light tracking-[0.56em] uppercase text-[10px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Wedding
          </p>
        </div>

        {/* ── PROGRESS ── */}
        <div className="vk-pfade flex flex-col items-center gap-3.5 w-[min(310px,72vw)]">

          {/* Meta row */}
          <div
            className="flex justify-between w-full text-[9px] tracking-[0.44em] uppercase font-light text-white/20"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>Loading</span>
            <span
              className="text-[rgba(200,169,110,0.85)] text-sm font-light tracking-[0.04em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {progress}%
            </span>
          </div>

          {/* Track */}
          <div className="relative w-full h-px bg-white/[0.07] overflow-visible">
            {/* Shimmer scan */}
            <div
              className="vk-scan absolute top-0 left-0 h-full w-16 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.18), transparent)" }}
            />
            {/* Fill bar with glowing tip */}
            <div
              className="vk-tip absolute top-0 left-0 h-full transition-[width] duration-[160ms] ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(200,169,110,0.45) 0%, #c8a96e 100%)",
              }}
            />
          </div>

          {/* Tick marks */}
          <div className="flex justify-between w-full px-px">
            {TICKS.map((i) => (
              <div
                key={i}
                className="w-px h-1 transition-colors duration-300"
                style={{
                  background: progress >= i * 10
                    ? "rgba(200,169,110,0.5)"
                    : "rgba(255,255,255,0.09)",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}