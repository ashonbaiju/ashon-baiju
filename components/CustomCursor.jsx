"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0); // fade in/out smoothly

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile-ish viewport
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Different spring feel for mobile vs desktop
  const smoothOptions = isMobile
    ? { stiffness: 500, damping: 32, mass: 0.28 } // snappier + responsive on mobile
    : { stiffness: 380, damping: 30, mass: 0.35 }; // smooth on desktop

  const smoothX = useSpring(cursorX, smoothOptions);
  const smoothY = useSpring(cursorY, smoothOptions);
  const smoothOpacity = useSpring(cursorOpacity, {
    stiffness: 300,
    damping: 20,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let prevX = lastX;
    let prevY = lastY;

    let lastTime = performance.now();
    let prevTime = lastTime;

    let lastScrollY = window.scrollY;

    const updatePosition = (x, y) => {
      prevX = lastX;
      prevY = lastY;
      prevTime = lastTime;

      lastX = x;
      lastY = y;
      lastTime = performance.now();

      cursorX.set(x);
      cursorY.set(y);
      cursorOpacity.set(1);
    };

    // Pointer / mouse move (desktop + modern mobile)
    const handlePointerMove = (e) => {
      if (e.pointerType === "touch" || e.pointerType === "mouse" || !e.pointerType) {
        updatePosition(e.clientX, e.clientY);
      }
    };

    // When pointer leaves window → hide cursor
    const handlePointerLeave = () => {
      cursorOpacity.set(0);
    };

    // Throw / inertia on release
    const handlePointerUp = () => {
      const now = performance.now();
      const dt = Math.max(now - prevTime, 16); // ms
      const vx = (lastX - prevX) / dt; // px/ms
      const vy = (lastY - prevY) / dt; // px/ms

      // Slightly different throw for mobile vs desktop
      const throwFactor = isMobile ? 120 : 200;

      const targetX = lastX + vx * throwFactor;
      const targetY = lastY + vy * throwFactor;

      cursorX.set(targetX);
      cursorY.set(targetY);
      cursorOpacity.set(1);
    };

    // Scroll float: smooth nudge opposite to scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const currentY = cursorY.get();

      // Smaller factor on mobile so it feels subtle, bigger on desktop
      const floatStrength = isMobile ? 0.25 : 0.45;

      cursorY.set(currentY - delta * floatStrength);
      cursorOpacity.set(1);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorX, cursorY, cursorOpacity, isMobile]);

  // Sizes: keep SAME on mobile, bigger on desktop
  // Sizes: circle + MUCH smaller glow on both
  const circleSize = isMobile ? 38 : 48;     // optional small tweak
  const glowSize   = isMobile ? 90 : 60;     // ↓ smaller on mobile & desktop

 // desktop bigger

  // Shared motion styles for all parts
  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    x: smoothX,
    y: smoothY,
    opacity: smoothOpacity,
    translateX: "-50%",
    translateY: "-50%",
  };

  return (
    <>
      {/* Outer glow (bigger, soft light) */}
      <motion.div
        className="z-[9997] rounded-full bg-white/20 blur-[40px]"
        style={{
          ...baseStyle,
          width: glowSize,
          height: glowSize,
        }}
      />

      {/* Main circle */}
      <motion.div
        className="
          z-[9999]
          rounded-full
          mix-blend-difference
          border
          border-white
          bg-white
          shadow-[0_0_40px_rgba(255,255,255,0.9)]
        "
        style={{
          ...baseStyle,
          width: circleSize,
          height: circleSize,
        }}
      />
    </>
  );
};

export default CustomCursor;
