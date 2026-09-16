"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio-data";

const NAME_LETTERS = personal.name.split("");

export default function LoadingScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const totalDelay = prefersReducedMotion ? 400 : 1700;
    const timer = setTimeout(() => {
      setVisible(false);
      // let the exit transition play before unmounting downstream
      setTimeout(onDone, prefersReducedMotion ? 50 : 500);
    }, totalDelay);
    return () => clearTimeout(timer);
  }, [onDone, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.5, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden font-display text-3xl sm:text-5xl tracking-tight text-ink-100">
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: prefersReducedMotion ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.04 * i,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-6 h-px w-40 overflow-hidden bg-ink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-amber"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ delay: 0.5, duration: 0.9, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
