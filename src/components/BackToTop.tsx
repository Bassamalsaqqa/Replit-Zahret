import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Ring geometry ───────────────────────────────────── */
const BTN    = 52;                          // outer button size (px)
const STROKE = 3.5;                         // ring stroke width
const R      = (BTN - STROKE * 2) / 2;     // ring radius
const CIRC   = 2 * Math.PI * R;

const DISC = 40; // inner disc diameter (px) — must be < BTN

export function BackToTop() {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  const [pct, setPct]         = useState(0);
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const p = maxScroll > 0 ? Math.min(100, Math.round((scrollTop / maxScroll) * 100)) : 0;
    setPct(p);
    setVisible(scrollTop > 280);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const dashOffset = CIRC - (pct / 100) * CIRC;
  const nearEnd    = pct >= 80;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 end-6 sm:bottom-8 sm:end-8 z-50"
          style={{ width: BTN, height: BTN }}
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit   ={{ opacity: 0, scale: 0.4, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ width: BTN, height: BTN }}
            whileHover={{ scale: 1.10 }}
            whileTap  ={{ scale: 0.90 }}
            aria-label={isRtl ? "العودة إلى الأعلى" : "Back to top"}
          >
            {/* ── Glow near 100 % ── */}
            <AnimatePresence>
              {nearEnd && (
                <motion.span
                  className="absolute rounded-full bg-primary/30 blur-md pointer-events-none"
                  style={{ inset: 0 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit   ={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>

            {/* ── SVG ring — pinned top-left, no right/bottom constraint ── */}
            <svg
              width={BTN}
              height={BTN}
              viewBox={`0 0 ${BTN} ${BTN}`}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block"
              style={{
                transform: "rotate(-90deg)",   /* progress starts at 12 o'clock */
              }}
            >
              {/* Track */}
              <circle
                cx={BTN / 2} cy={BTN / 2} r={R}
                fill="none"
                strokeWidth={STROKE}
                className="stroke-primary/20"
              />
              {/* Progress arc */}
              <circle
                cx={BTN / 2} cy={BTN / 2} r={R}
                fill="none"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={dashOffset}
                className={`transition-[stroke-dashoffset,stroke] duration-150 ${
                  nearEnd ? "stroke-secondary" : "stroke-primary"
                }`}
              />
            </svg>

            {/* ── Inner disc — absolute-centred with translate trick ── */}
            <div
              className={`absolute pointer-events-none flex items-center justify-center rounded-full
                shadow-lg border transition-colors duration-300
                ${nearEnd
                  ? "bg-secondary border-secondary text-secondary-foreground"
                  : "bg-background border-border group-hover:bg-primary group-hover:border-primary"
                }`}
              style={{
                width:  DISC,
                height: DISC,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <ArrowUp
                className={`h-[18px] w-[18px] transition-colors duration-200 ${
                  nearEnd
                    ? "text-secondary-foreground"
                    : "text-primary group-hover:text-primary-foreground"
                }`}
                strokeWidth={2.5}
              />
            </div>

            {/* ── Hover tooltip ── */}
            <div
              className="
                absolute bottom-full mb-2 inset-x-0
                flex justify-center
                opacity-0 group-hover:opacity-100
                translate-y-1 group-hover:translate-y-0
                transition-all duration-200 pointer-events-none
              "
            >
              <div className="relative flex flex-col items-center">
                <span className="bg-foreground text-background text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-md leading-none">
                  {pct}%
                </span>
                <span className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-foreground" />
              </div>
            </div>
          </motion.button>

          {/* ── Mobile pct badge ── */}
          <motion.div
            className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-background border border-border shadow flex items-center justify-center sm:hidden pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`text-[8px] font-black leading-none ${nearEnd ? "text-secondary" : "text-primary"}`}>
              {pct}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
