"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // End loading screen after 1.5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 bg-[#07070A] z-[9999] flex items-center justify-center select-none"
        >
          {/* Pulsing initials */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.05, 0.95, 1],
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
            }}
            className="text-6xl sm:text-8xl font-extrabold font-heading text-gradient-animate tracking-wider"
          >
            BA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
