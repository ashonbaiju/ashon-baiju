"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// =========================================================
// 📱 MOBILE CURSOR COMPONENT
// Strict 1:1 tracking. Follows finger exactly.
// =========================================================
const MobileCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  useEffect(() => {
    const updatePos = (x, y) => {
      cursorX.set(x);
      cursorY.set(y);
      cursorOpacity.set(1);
    };

    const hideCursor = () => {
      cursorOpacity.set(0);
    };

    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (t) updatePos(t.clientX, t.clientY);
    };

    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) updatePos(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      hideCursor();
    };

    // Add listeners
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        x: cursorX,
        y: cursorY,
        opacity: cursorOpacity,
        translateX: "-50%",
        translateY: "-50%",
        width: 60,
        height: 60,
        zIndex: 9999,
      }}
      className="flex items-center justify-center"
    >
      {/* Visual Circle for Mobile */}
      <div className="w-full h-full rounded-full border-2 border-white/40 bg-white/10 blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
    </motion.div>
  );
};

// =========================================================
// 💻 DESKTOP CURSOR COMPONENT
// Smooth springs, inertia, and fluid movement.
// =========================================================
const DesktopCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth "floaty" feel
  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        zIndex: 9999,
      }}
    >
      {/* Outer Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white blur-xl opacity-50"
      />
      
      {/* Center Dot */}
      <div className="w-4 h-4 rounded-full bg-white mix-blend-difference" />
    </motion.div>
  );
};

// =========================================================
// 🛠 MAIN WRAPPER
// Decides which cursor to render
// =========================================================
const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDevice = () => {
      // Basic check: Width < 768px OR if device supports touch strictly
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileCursor /> : <DesktopCursor />;
};

export default CustomCursor;
