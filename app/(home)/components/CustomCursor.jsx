"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

const CustomCursor = () => {
  // 1. Core Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  // 2. State
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouching, setIsTouching] = useState(false); // New: Track if user is holding screen

  // 3. Velocity Tracker (Refs are stable and don't cause re-renders)
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    time: 0,
  });

  // 4. Hydration & Device Check
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ------------------------------------------------------------------
  // 🔹 SPRING PHYSICS
  // ------------------------------------------------------------------

  // Desktop Dot (Fast)
  const dotConfig = { stiffness: 500, damping: 35, mass: 0.5 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Mobile Ring / Desktop Glow (Fluid & Heavy)
  const glowConfig = { stiffness: 150, damping: 20, mass: 1.5 };
  const glowX = useSpring(cursorX, glowConfig);
  const glowY = useSpring(cursorY, glowConfig);

  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 300, damping: 20 });

  // ------------------------------------------------------------------
  // 🔹 MOVEMENT LOGIC
  // ------------------------------------------------------------------

  // Helper to keep cursor inside screen
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const updatePosition = (x, y) => {
    if (typeof window === "undefined") return;

    const now = performance.now();
    const v = velocityInfo.current;

    // Update Velocity History
    v.prevX = v.lastX;
    v.prevY = v.lastY;
    v.lastX = x;
    v.lastY = y;
    v.time = now;

    // Update Motion Values directly
    cursorX.set(x);
    cursorY.set(y);
    cursorOpacity.set(1);
  };

  const triggerThrow = () => {
    const now = performance.now();
    const v = velocityInfo.current;
    
    // Prevent divide by zero or huge jumps
    const dt = Math.max(now - v.time, 10); 
    
    // If too much time passed since last move (user stopped), don't throw
    if (now - v.time > 50) return; 

    // Calculate Velocity
    const vx = (v.lastX - v.prevX) / dt;
    const vy = (v.lastY - v.prevY) / dt;

    const throwPower = isMobile ? 300 : 200; // Stronger throw on mobile

    const targetX = v.lastX + vx * throwPower;
    const targetY = v.lastY + vy * throwPower;

    // Animate the source value; springs will follow
    animate(cursorX, clamp(targetX, 0, window.innerWidth), { type: "spring", stiffness: 40, damping: 15 });
    animate(cursorY, clamp(targetY, 0, window.innerHeight), { type: "spring", stiffness: 40, damping: 15 });
  };

  // ------------------------------------------------------------------
  // 🔹 EVENT LISTENERS
  // ------------------------------------------------------------------

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    let lastScrollY = window.scrollY;

    // --- TOUCH (Mobile) ---
    const onTouchStart = (e) => {
      setIsTouching(true);
      const t = e.touches[0];
      if(t) updatePosition(t.clientX, t.clientY);
    };

    const onTouchMove = (e) => {
      const t = e.touches[0];
      if(t) updatePosition(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      setIsTouching(false);
      triggerThrow();
    };

    // --- MOUSE (Desktop) ---
    const onMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      cursorOpacity.set(0);
    };

    // --- SCROLL (Fluid Drag) ---
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Only apply scroll "drag" if NOT currently touching
      // This fixes the issue where the cursor fights your finger
      if (!isTouching) {
        const currentY = cursorY.get();
        cursorY.set(currentY - delta * 0.8);
      }
    };

    // Attach Listeners
    if (isMobile) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);
    }
    
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, isMobile, isTouching]); // Dependencies ensure clean re-binds

  // Don't render until client-side hydration is done
  if (!mounted) return null;

  // ------------------------------------------------------------------
  // 🔹 STYLES
  // ------------------------------------------------------------------

  const glowVariants = {
    idle: { scale: 1, opacity: 0.5 },
    breathing: {
      scale: [1, 1.15, 1],
      opacity: [0.5, 0.7, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    opacity: smoothOpacity,
    translateX: "-50%",
    translateY: "-50%",
  };

  return (
    <>
      {/* 📱 MOBILE: Finger Ring */}
      {isMobile && (
        <motion.div
          variants={glowVariants}
          animate="breathing"
          style={{
            ...baseStyle,
            x: glowX, // Fluid spring
            y: glowY,
            width: 80, 
            height: 80,
          }}
          className="z-[9999] rounded-full border border-white/40 bg-white/5 blur-[1px] mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        />
      )}

      {/* 💻 DESKTOP: Dot + Glow */}
      {!isMobile && (
        <>
          {/* Ambient Glow */}
          <motion.div
            variants={glowVariants}
            animate="breathing"
            style={{
              ...baseStyle,
              x: glowX, 
              y: glowY,
              width: 100,
              height: 100,
            }}
            className="z-[9997] rounded-full bg-white blur-[40px] mix-blend-difference"
          />

          {/* Sharp Pointer */}
          <motion.div
            style={{
              ...baseStyle,
              x: dotX,
              y: dotY,
              width: 16,
              height: 16,
            }}
            className="z-[9999] rounded-full mix-blend-difference bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
