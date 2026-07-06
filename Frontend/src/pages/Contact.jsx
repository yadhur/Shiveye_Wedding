import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';

const socialLinks = [
  {
    name: "Instagram",
    handle: "Shiveye Wedding",
    icon: "mdi:instagram",
    color: "#E1306C",
    href:'https://www.instagram.com/shivtejdeshmukh_?igsh=dnhqMm9nOXdkcmJo'
  },
  {
    name: "YouTube",
    handle: "Shiveye Wedding",
    icon: "mdi:youtube",
    color: "#FF0000",
    href:'http://www.youtube.com/@shivtej_deshmukh'
  },
];

const contactInfo = [
  {
    label: "Email",
    value: "shivtejfilms.work@gmail.com",
    icon: "mdi:email-outline",
  },
  {
    label: "Phone",
    value: "+91 8830201183",
    icon: "mdi:phone-outline",
  },
  {
    label: "Studio",
    value: "Amravati, Maharashtra, India.",
    icon: "mdi:map-marker-outline",
  },
];

const obj ={
  name:'',
  type:'',
  email:'',
  message:''
}

export default function ContactPage() {
  const [formState, setFormState] = useState(obj);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true });

  const handleChange = (e) => setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    setSending(true);
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      console.log('res',res);
      if(!res?.ok) return toast?.error('Something went wrong. Please try again later')
      toast?.success('Enquiry has been sent successfully')
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast?.error('Something went wrong. Please try again later')
    } finally {
      setSending(false);
    }    
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };



  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#1b3c26] to-[#29392e] text-white overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&display=swap');
        .mono { font-family: 'Montserrat', sans-serif; }
        input, textarea, select { outline: none; background: transparent; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px #0f0e0c inset;
          transition: background-color 5000s ease-in-out 0s;
        }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #080807; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; }

        .grain-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 9999; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }

        .input-field {
          width: 100%;
          padding: 14px 0;
          background: transparent;
          color: white;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          transition: border-color 0.4s ease;
        }
        .input-field:focus { border-bottom-color: #c8a96e; }
        .input-field::placeholder { color: rgba(255,255,255,0.2); font-weight: 300; }

        .send-btn { position: relative; overflow: hidden; }
        .send-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: white;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .send-btn:hover::after { transform: translateX(0); }
        .send-btn span { position: relative; z-index: 1; transition: color 0.4s ease; }
        .send-btn:hover span { color: #080807; }
      `}</style>

      <div className="grain-overlay" />


      {/* MAIN CONTENT */}
      <div className="min-h-screen flex flex-col lg:flex-row ">

        {/* ── LEFT PANEL ── */}
        <motion.div
          ref={leftRef}
          initial="hidden"
          animate={leftInView ? "visible" : "hidden"}
          variants={stagger}
          className="relative lg:w-[48%] flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-5 lg:py-24 overflow-hidden"
        >
          {/* Ghost watermark */}
          <div
            className="absolute -left-6 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-light italic"
            style={{
              fontSize: "clamp(120px, 18vw, 220px)",
              color: "rgba(243, 227, 227, 0.02)",
              whiteSpace: "nowrap",
              letterSpacing: "-0.03em",
            }}
          >
            Talk
          </div>

          {/* Gold vertical divider */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c8a96e]/30 to-transparent hidden lg:block" />

          {/* Label */}
          <motion.div variants={fadeUp} className="mono text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase flex items-center gap-2">
            <Icon icon="mdi:chat-outline" className="text-sm" />
            Get In Touch
          </motion.div>

          {/* BIG HEADING */}
          <div className="my-auto py-10">
            <motion.h1
              variants={fadeUp}
              className="font-light leading-none"
              style={{ fontSize: "clamp(52px, 8vw, 120px)", letterSpacing: "-0.02em" }}
            >
              Let's
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="italic leading-none text-gray-300"
              style={{ fontSize: "clamp(52px, 8vw, 120px)", letterSpacing: "-0.02em", marginTop: "-0.05em" }}
            >
              Talk.
            </motion.h1>

            <motion.div variants={fadeUp} className="w-14 h-px bg-[#c8a96e] mt-8 mb-8" />

            <motion.p variants={fadeUp} className="mono text-gray-400 text-sm font-light leading-loose max-w-xs">
              Whether it's a wedding, a portrait session, or a commercial project — I'd love to hear your vision and bring it to life.
            </motion.p>

            {/* Contact info */}
            <motion.div variants={stagger} className="mt-10 flex flex-col gap-5">
              {contactInfo.map((info) => (
                <motion.div key={info.label} variants={fadeUp} className="flex items-start gap-4 group cursor-pointer">
                  <div className="text-[#c8a96e] mt-0.5 flex-shrink-0">
                    <Icon icon={info.icon} className="text-lg" />
                  </div>
                  <div>
                    <div className="mono text-[9px] tracking-[0.4em] text-[#c8a96e] uppercase mb-1">{info.label}</div>
                    <div className="mono text-sm text-gray-300 font-light group-hover:text-white transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── SOCIAL MEDIA ── */}
          <motion.div variants={fadeUp}>
            <div className="mono text-[9px] tracking-[0.45em] text-[#c8a96e] uppercase mb-5 flex items-center gap-2">
              <Icon icon="mdi:share-variant-outline" className="text-xs" />
              Follow Along
            </div>

            

            {/* Icon pill row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex gap-3 flex-wrap"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={`pill-${social.name}`}
                  href={social?.href}
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  target="_blank"
                  className="w-9 h-9 border border-gray-800 flex items-center justify-center text-gray-500 transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  title={social.name}
                >
                  <Icon icon={social.icon} className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL: FORM ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-[52%] flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 lg:py-24 relative"
        >
          <div className="absolute inset-0" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, #c8a96e 0%, transparent 60%), radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)",
            }}
          />

          <div className="relative w-full max-w-lg z-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Form header */}
                  <div className="mb-12">
                    <div className="mono text-[#c8a96e] text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center gap-2">
                      <Icon icon="mdi:pencil-outline" className="text-sm" />
                      Send A Message
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light">
                      Start Your
                      <span className="italic text-gray-400 ml-3">Story</span>
                    </h2>
                    <div className="w-10 h-px bg-[#c8a96e] mt-5" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mono text-[9px] tracking-[0.4em] text-white uppercase flex items-center gap-1.5 mb-2">
                          <Icon icon="mdi:account-outline" className="text-xs" />
                          Your Name
                        </label>
                        <input
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Jane Doe"
                          required
                          className="input-field"
                          style={{ borderBottomColor: focused === "name" ? "#c8a96e" : undefined }}
                        />
                      </div>
                      <div>
                        <label className="mono text-[9px] tracking-[0.4em] text-white uppercase flex items-center gap-1.5 mb-2">
                          <Icon icon="mdi:email-outline" className="text-xs" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="jane@email.com"
                          required
                          className="input-field"
                          style={{ borderBottomColor: focused === "email" ? "#c8a96e" : undefined }}
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="mono text-[9px] tracking-[0.4em] text-white uppercase flex items-center gap-1.5 mb-2">
                        <Icon icon="mdi:camera-outline" className="text-xs" />
                        Project Type
                      </label>
                      <div className="relative">
                        <select
                          name="type"
                          value={formState?.type}
                          onChange={handleChange}
                          onFocus={() => setFocused("type")}
                          onBlur={() => setFocused(null)}
                          required
                          className="input-field appearance-none cursor-pointer w-full"
                          style={{
                            color: formState?.type ? "white" : "rgba(255,255,255,0.2)",
                            borderBottomColor: focused === "subject" ? "#c8a96e" : undefined,
                          }}
                        >
                          <option value="" disabled style={{ background: "#0c0b09" }}>Select a category</option>
                          <option value="wedding" style={{ background: "#0c0b09" }}>Wedding Photography</option>
                          <option value="pre-wedding" style={{ background: "#0c0b09" }}>Pre-Wedding</option>
                          <option value="baby-shower" style={{ background: "#0c0b09" }}>Baby Shower</option>
                          <option value="engagement" style={{ background: "#0c0b09" }}>Engagement</option>
                          <option value="other" style={{ background: "#0c0b09" }}>Other</option>
                        </select>
                        <Icon
                          icon="mdi:chevron-down"
                          className="absolute right-0 bottom-3.5 text-gray-500 pointer-events-none text-base"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mono text-[9px] tracking-[0.4em] text-white uppercase flex items-center gap-1.5 mb-2">
                        <Icon icon="mdi:message-text-outline" className="text-xs" />
                        Tell Me About Your Vision
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="Describe your project, date, location, or anything else..."
                        required
                        rows={4}
                        className="input-field resize-none"
                        style={{
                          borderBottom: `1px solid ${focused === "message" ? "#c8a96e" : "rgba(255,255,255,0.12)"}`,
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileTap={{ scale: 0.97 }}
                        className="send-btn mono text-xs tracking-[0.3em] uppercase bg-[#c8a96e] text-black px-10 py-4 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          {sending ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-flex"
                              >
                                <Icon icon="mdi:loading" className="text-base" />
                              </motion.span>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Icon icon="mdi:send-outline" className="text-base" />
                            </>
                          )}
                        </span>
                      </motion.button>
                      <p className="mono text-[10px] text-white font-light leading-relaxed flex items-start gap-1.5">
                        <Icon icon="mdi:clock-outline" className="text-sm mt-0.5 flex-shrink-0 text-white" />
                        I reply within<br />24 hours.
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 border border-[#c8a96e] flex items-center justify-center mb-8"
                  >
                    <Icon icon="mdi:check-bold" className="text-3xl text-[#c8a96e]" />
                  </motion.div>
                  <h3 className="text-4xl font-light mb-4">
                    Message
                    <span className="italic text-gray-400 ml-2">Sent.</span>
                  </h3>
                  <div className="w-8 h-px bg-[#c8a96e] mx-auto mb-6" />
                  <p className="mono text-gray-500 text-sm font-light leading-loose max-w-xs">
                    Thank you for reaching out. I'll be in touch within 24 hours to start creating something beautiful.
                  </p>
                  <motion.button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "" });
                    }}
                    whileHover={{ x: 4 }}
                    className="mono text-xs tracking-[0.3em] uppercase text-[#c8a96e] mt-10 flex items-center gap-2"
                  >
                    <Icon icon="mdi:arrow-left" className="text-sm" />
                    Send Another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <ToastContainer />

    </div>
  );
}