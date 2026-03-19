"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MinimalGlow = () => {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30, mass: 1 });

  useEffect(() => {
    setMounted(true);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMove = (e) => {
      // Direct follow for cursor/touch responsiveness
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[-1] overflow-visible"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="mix-blend-screen"
        style={{
          width: "45vw",
          height: "35vw",
          minWidth: "350px",
          minHeight: "350px",
          background: "linear-gradient(135deg, rgba(80, 100, 200, 0.25) 0%, rgba(130, 80, 220, 0.15) 100%)",
          filter: "blur(70px)",
        }}
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "20% 80% 60% 40% / 40% 60% 80% 20%",
            "80% 20% 40% 60% / 60% 40% 20% 80%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
          rotate: [0, 120, 240, 310, 360],
          scale: [0.8, 1.3, 0.9, 1.2, 0.8],
          opacity: [0.4, 0.7, 0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default MinimalGlow;
