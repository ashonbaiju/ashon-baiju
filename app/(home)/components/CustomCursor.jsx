"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useTransform,
} from "framer-motion";

const CustomCursor = () => {
  // 1. Raw Coordinates (The target where the cursor wants to go)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  
  // Refs to track velocity for the "Throw"
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    prevTime: 0,
  });

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

  // 🔹 CONFIGURATION
  const circleSize = isMobile ? 30 : 20; // Slightly smaller dot for precision
  const glowSize = isMobile ? 120 : 100;
  const glowRadius = glowSize / 2;

  // 🔹 PHYSICS ENGINE (Dual Spring System)
  
  // 1. The Dot (Snappy, responsive)
  const dotSpringConfig = { stiffness: 500, damping: 35, mass: 0.5 };
  const smoothX = useSpring(cursorX, dotSpringConfig);
  const smoothY = useSpring(cursorY, dotSpringConfig);

  // 2. The Glow (Fluid, heavy, "watery" feel)
  const glowSpringConfig = { stiffness: 150, damping: 20, mass: 1.5 };
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 300, damping: 20 });

  // 🔹 GLOWING PULSE ANIMATION (Breathing)
  const glowVariants = {
    idle: {
      scale: 1,
      opacity: 0.5,
    },
    breathing: {
      scale: [1, 1.2, 1], // Pulse size
      opacity: [0.5, 0.8, 0.5], // Pulse brightness
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;

    // Helper: Keep cursor inside window
    const clampToViewport = (x, y) => {
      const margin = 10;
      const maxX = window.innerWidth - margin;
      const minX = margin;
      const maxY = window.innerHeight - margin;
      const minY = margin;
      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      };
    };

    // 1. MOVEMENT LOGIC
    const updatePosition = (x, y) => {
      // Update velocity trackers
      const now = performance.now();
      velocityInfo.current.prevX = velocityInfo.current.lastX;
      velocityInfo.current.prevY = velocityInfo.current.lastY;
      velocityInfo.current.prevTime = velocityInfo.current.lastTime;
      
      velocityInfo.current.lastX = x;
      velocityInfo.current.lastY = y;
      velocityInfo.current.lastTime = now;

      // Set Motion Values
      const clamped = clampToViewport(x, y);
      cursorX.set(clamped.x);
      cursorY.set(clamped.y);
      cursorOpacity.set(1);
    };

    const handlePointerMove = (e) => updatePosition(e.clientX, e.clientY);
    
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (t) updatePosition(t.clientX, t.clientY);
    };

    // 2. SCROLL LOGIC (Fluid Drag)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const currentY = cursorY.get();
      const currentX = cursorX.get();

      // "Drag" the cursor slightly with the scroll
      const movedY = currentY - delta * 0.8; 
      
      const clamped = clampToViewport(currentX, movedY);
      cursorY.set(clamped.y);
    };

    // 3. THROW LOGIC (Inertia on release)
    const handlePointerUp = () => {
      const now = performance.now();
      const dt = Math.max(now - velocityInfo.current.prevTime, 16);
      
      // Calculate velocity
      const vx = (velocityInfo.current.lastX - velocityInfo.current.prevX) / dt;
      const vy = (velocityInfo.current.lastY - velocityInfo.current.prevY) / dt;

      const throwFactor = 150; // How far it throws
      
      let targetX = velocityInfo.current.lastX + vx * throwFactor;
      let targetY = velocityInfo.current.lastY + vy * throwFactor;

      const clamped = clampToViewport(targetX, targetY);

      // Animate the MotionValue -> The Springs will automatically follow this animation smoothly
      animate(cursorX, clamped.x, { type: "spring", stiffness: 80, damping: 15 });
      animate(cursorY, clamped.y, { type: "spring", stiffness: 80, damping: 15 });
    };

    const handlePointerLeave = () => cursorOpacity.set(0);

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
    };
  }, [cursorX, cursorY, cursorOpacity]);

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
      {/* 🔹 THE GLOW (Fluid, Breathing, trails behind) */}
      <motion.div
        variants={glowVariants}
        animate="breathing"
        style={{
          ...baseStyle,
          x: glowX, // Uses the "Heavy" spring
          y: glowY,
          width: glowSize,
          height: glowSize,
        }}
        className="z-[9997] rounded-full bg-white blur-[40px] mix-blend-difference"
      />

      {/* 🔹 THE DOT (Snappy, Precise) */}
      {!isMobile && (
        <motion.div
          style={{
            ...baseStyle,
            x: smoothX, // Uses the "Fast" spring
            y: smoothY,
            width: circleSize,
            height: circleSize,
          }}
          className="z-[9999] rounded-full mix-blend-difference bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
        />
      )}
    </>
  );
};

export default CustomCursor;
