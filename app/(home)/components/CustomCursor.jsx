"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sizes: bigger on mobile
  const circleSize = isMobile ? 44 : 32;
  const glowSize = isMobile ? 150 : 110;
  const glowRadius = glowSize / 2;

  // Springs (mainly for desktop)
  const smoothX = useSpring(cursorX, {
    stiffness: isMobile ? 500 : 320,
    damping: isMobile ? 40 : 30,
    mass: isMobile ? 0.2 : 0.35,
  });

  const smoothY = useSpring(cursorY, {
    stiffness: isMobile ? 500 : 320,
    damping: isMobile ? 40 : 30,
    mass: isMobile ? 0.2 : 0.35,
  });

  const smoothOpacity = useSpring(cursorOpacity, {
    stiffness: 320,
    damping: 24,
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
    let idleTimeout = null;

    const clampToViewport = (x, y) => {
      const margin = 4; // small safety
      const maxX = window.innerWidth - glowRadius - margin;
      const minX = glowRadius + margin;
      const maxY = window.innerHeight - glowRadius - margin;
      const minY = glowRadius + margin;

      const clampedX = Math.min(Math.max(x, minX), maxX);
      const clampedY = Math.min(Math.max(y, minY), maxY);

      return { x: clampedX, y: clampedY };
    };

    const setActive = () => {
      setIsIdle(false);
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsIdle(true), 600);
    };

    const updatePosition = (x, y) => {
      const { x: cx, y: cy } = clampToViewport(x, y);

      prevX = lastX;
      prevY = lastY;
      prevTime = lastTime;

      lastX = cx;
      lastY = cy;
      lastTime = performance.now();

      cursorX.set(cx);
      cursorY.set(cy);
      cursorOpacity.set(1);
      setActive();
    };

    const handlePointerMove = (e) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      updatePosition(t.clientX, t.clientY);
    };

    const handlePointerLeave = () => {
      cursorOpacity.set(0);
    };

    // Throw / inertia
    const handlePointerUp = () => {
      const now = performance.now();
      const dt = Math.max(now - prevTime, 16);
      const vx = (lastX - prevX) / dt;
      const vy = (lastY - prevY) / dt;

      const throwFactor = 200;

      let targetX = lastX + vx * throwFactor;
      let targetY = lastY + vy * throwFactor;

      const clamped = clampToViewport(targetX, targetY);
      targetX = clamped.x;
      targetY = clamped.y;

      animate(cursorX, targetX, {
        type: "spring",
        stiffness: 120,
        damping: 18,
      });

      animate(cursorY, targetY, {
        type: "spring",
        stiffness: 120,
        damping: 18,
      });

      cursorOpacity.set(1);
      setActive();
    };

    // Scroll float
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const currentY = cursorY.get();
      const moved = clampToViewport(lastX, currentY - delta * 0.6);

      cursorY.set(moved.y);
      cursorOpacity.set(1);
      setActive();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [cursorX, cursorY, cursorOpacity, glowRadius]);

  // On mobile use raw motion values (no lag), on desktop use spring
  const xValue = isMobile ? cursorX : smoothX;
  const yValue = isMobile ? cursorY : smoothY;

  const idleScale = isIdle ? 1.08 : 1;

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    x: xValue,
    y: yValue,
    opacity: smoothOpacity,
    translateX: "-50%",
    translateY: "-50%",
  };

  return (
    <>
      {/* Glow */}
      <motion.div
        className="z-[9997] rounded-full bg-white/20 blur-[40px]"
        style={{ ...baseStyle, width: glowSize, height: glowSize }}
        animate={{ scale: idleScale }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Main circle */}
      <motion.div
        className="z-[9999] rounded-full mix-blend-difference border border-white bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)]"
        style={{ ...baseStyle, width: circleSize, height: circleSize }}
        animate={{ scale: idleScale }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </>
  );
};

export default CustomCursor;
