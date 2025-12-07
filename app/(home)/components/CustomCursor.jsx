"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

const CustomCursor = () => {
  // 1. Core Motion Values (The Target Coordinates)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);

  // 2. Velocity Tracker (For the "Throw" effect)
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    prevTime: 0,
  });

  // 3. Detect Device Type
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ------------------------------------------------------------------
  // 🔹 PHYSICS CONFIGURATION
  // ------------------------------------------------------------------

  // A. Desktop Dot (Fast & Snappy)
  const dotSpring = useSpring(cursorX, { stiffness: 500, damping: 35, mass: 0.5 });
  const dotYSpring = useSpring(cursorY, { stiffness: 500, damping: 35, mass: 0.5 });

  // B. The Glow/Mobile Ring (Fluid & Heavy - carries momentum)
  const glowSpring = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 1.5 });
  const glowYSpring = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 1.5 });

  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 300, damping: 20 });

  // ------------------------------------------------------------------
  // 🔹 SHARED LOGIC: MOVEMENT & THROW CALCULATION
  // ------------------------------------------------------------------

  const clampToViewport = (x, y) => {
    if (typeof window === "undefined") return { x, y };
    const margin = 10;
    return {
      x: Math.min(Math.max(x, margin), window.innerWidth - margin),
      y: Math.min(Math.max(y, margin), window.innerHeight - margin),
    };
  };

  const updateCoordinates = (x, y) => {
    // 1. Update Velocity History
    const now = performance.now();
    velocityInfo.current.prevX = velocityInfo.current.lastX;
    velocityInfo.current.prevY = velocityInfo.current.lastY;
    velocityInfo.current.prevTime = velocityInfo.current.lastTime;
    
    velocityInfo.current.lastX = x;
    velocityInfo.current.lastY = y;
    velocityInfo.current.lastTime = now;

    // 2. Update Motion Values
    const clamped = clampToViewport(x, y);
    cursorX.set(clamped.x);
    cursorY.set(clamped.y);
    cursorOpacity.set(1);
  };

  const triggerThrow = () => {
    const now = performance.now();
    // Calculate time difference (avoid divide by zero)
    const dt = Math.max(now - velocityInfo.current.prevTime, 16); 
    
    // Calculate Velocity (Pixels per millisecond)
    const vx = (velocityInfo.current.lastX - velocityInfo.current.prevX) / dt;
    const vy = (velocityInfo.current.lastY - velocityInfo.current.prevY) / dt;

    // "Throw Factor" - how far it flies
    const throwPower = 200; 
    
    let targetX = velocityInfo.current.lastX + vx * throwPower;
    let targetY = velocityInfo.current.lastY + vy * throwPower;

    const clamped = clampToViewport(targetX, targetY);

    // Animate the raw MotionValue. 
    // The springs (glowSpring/dotSpring) will naturally follow this animation smoothly.
    animate(cursorX, clamped.x, { type: "spring", stiffness: 60, damping: 15 });
    animate(cursorY, clamped.y, { type: "spring", stiffness: 60, damping: 15 });
  };

  // ------------------------------------------------------------------
  // 🔹 EVENT LISTENERS
  // ------------------------------------------------------------------

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- MOBILE LOGIC (Touch) ---
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCoordinates(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      // Trigger the throw when finger leaves screen
      triggerThrow();
      // Optional: Fade out after a delay if you want it to disappear
      // setTimeout(() => cursorOpacity.set(0), 1000); 
    };

    // --- DESKTOP LOGIC (Mouse) ---
    const handleMouseMove = (e) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      triggerThrow();
    };
    
    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    // --- SCROLL LOGIC (Fluid Drag for both) ---
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      // Drag cursor vertically with scroll
      const currentY = cursorY.get();
      cursorY.set(currentY - delta * 0.8);
    };

    if (isMobile) {
      // Mobile Listeners
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      // Desktop Listeners
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // Common Listeners
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, cursorX, cursorY, cursorOpacity]);

  // ------------------------------------------------------------------
  // 🔹 STYLES & RENDERING
  // ------------------------------------------------------------------

  const glowVariants = {
    idle: { scale: 1, opacity: 0.5 },
    breathing: {
      scale: [1, 1.1, 1],
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
      {/* 📱 MOBILE VERSION: Single "Finger Ring" (Uses Fluid Physics) */}
      {isMobile && (
        <motion.div
          variants={glowVariants}
          animate="breathing"
          style={{
            ...baseStyle,
            x: glowSpring, // Follows finger fluidly
            y: glowYSpring,
            width: 80, // Visible size under finger
            height: 80,
          }}
          className="z-[9999] rounded-full border-2 border-white/40 bg-white/10 blur-[1px] mix-blend-difference"
        >
          {/* Inner Glow Center */}
          <div className="absolute inset-0 bg-white/30 blur-xl rounded-full" />
        </motion.div>
      )}

      {/* 💻 DESKTOP VERSION: Dot + Glow */}
      {!isMobile && (
        <>
          {/* 1. Fluid Glow (Laggy) */}
          <motion.div
            variants={glowVariants}
            animate="breathing"
            style={{
              ...baseStyle,
              x: glowSpring, 
              y: glowYSpring,
              width: 100,
              height: 100,
            }}
            className="z-[9997] rounded-full bg-white blur-[40px] mix-blend-difference"
          />

          {/* 2. Sharp Dot (Snappy) */}
          <motion.div
            style={{
              ...baseStyle,
              x: dotSpring,
              y: dotYSpring,
              width: 20,
              height: 20,
            }}
            className="z-[9999] rounded-full mix-blend-difference bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

const CustomCursor = () => {
  // 1. Core Motion Values (The Target Coordinates)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);

  // 2. Velocity Tracker (For the "Throw" effect)
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    prevTime: 0,
  });

  // 3. Detect Device Type
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ------------------------------------------------------------------
  // 🔹 PHYSICS CONFIGURATION
  // ------------------------------------------------------------------

  // A. Desktop Dot (Fast & Snappy)
  const dotSpring = useSpring(cursorX, { stiffness: 500, damping: 35, mass: 0.5 });
  const dotYSpring = useSpring(cursorY, { stiffness: 500, damping: 35, mass: 0.5 });

  // B. The Glow/Mobile Ring (Fluid & Heavy - carries momentum)
  const glowSpring = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 1.5 });
  const glowYSpring = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 1.5 });

  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 300, damping: 20 });

  // ------------------------------------------------------------------
  // 🔹 SHARED LOGIC: MOVEMENT & THROW CALCULATION
  // ------------------------------------------------------------------

  const clampToViewport = (x, y) => {
    if (typeof window === "undefined") return { x, y };
    const margin = 10;
    return {
      x: Math.min(Math.max(x, margin), window.innerWidth - margin),
      y: Math.min(Math.max(y, margin), window.innerHeight - margin),
    };
  };

  const updateCoordinates = (x, y) => {
    // 1. Update Velocity History
    const now = performance.now();
    velocityInfo.current.prevX = velocityInfo.current.lastX;
    velocityInfo.current.prevY = velocityInfo.current.lastY;
    velocityInfo.current.prevTime = velocityInfo.current.lastTime;
    
    velocityInfo.current.lastX = x;
    velocityInfo.current.lastY = y;
    velocityInfo.current.lastTime = now;

    // 2. Update Motion Values
    const clamped = clampToViewport(x, y);
    cursorX.set(clamped.x);
    cursorY.set(clamped.y);
    cursorOpacity.set(1);
  };

  const triggerThrow = () => {
    const now = performance.now();
    // Calculate time difference (avoid divide by zero)
    const dt = Math.max(now - velocityInfo.current.prevTime, 16); 
    
    // Calculate Velocity (Pixels per millisecond)
    const vx = (velocityInfo.current.lastX - velocityInfo.current.prevX) / dt;
    const vy = (velocityInfo.current.lastY - velocityInfo.current.prevY) / dt;

    // "Throw Factor" - how far it flies
    const throwPower = 200; 
    
    let targetX = velocityInfo.current.lastX + vx * throwPower;
    let targetY = velocityInfo.current.lastY + vy * throwPower;

    const clamped = clampToViewport(targetX, targetY);

    // Animate the raw MotionValue. 
    // The springs (glowSpring/dotSpring) will naturally follow this animation smoothly.
    animate(cursorX, clamped.x, { type: "spring", stiffness: 60, damping: 15 });
    animate(cursorY, clamped.y, { type: "spring", stiffness: 60, damping: 15 });
  };

  // ------------------------------------------------------------------
  // 🔹 EVENT LISTENERS
  // ------------------------------------------------------------------

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- MOBILE LOGIC (Touch) ---
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCoordinates(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      // Trigger the throw when finger leaves screen
      triggerThrow();
      // Optional: Fade out after a delay if you want it to disappear
      // setTimeout(() => cursorOpacity.set(0), 1000); 
    };

    // --- DESKTOP LOGIC (Mouse) ---
    const handleMouseMove = (e) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      triggerThrow();
    };
    
    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    // --- SCROLL LOGIC (Fluid Drag for both) ---
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      // Drag cursor vertically with scroll
      const currentY = cursorY.get();
      cursorY.set(currentY - delta * 0.8);
    };

    if (isMobile) {
      // Mobile Listeners
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      // Desktop Listeners
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // Common Listeners
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, cursorX, cursorY, cursorOpacity]);

  // ------------------------------------------------------------------
  // 🔹 STYLES & RENDERING
  // ------------------------------------------------------------------

  const glowVariants = {
    idle: { scale: 1, opacity: 0.5 },
    breathing: {
      scale: [1, 1.1, 1],
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
      {/* 📱 MOBILE VERSION: Single "Finger Ring" (Uses Fluid Physics) */}
      {isMobile && (
        <motion.div
          variants={glowVariants}
          animate="breathing"
          style={{
            ...baseStyle,
            x: glowSpring, // Follows finger fluidly
            y: glowYSpring,
            width: 80, // Visible size under finger
            height: 80,
          }}
          className="z-[9999] rounded-full border-2 border-white/40 bg-white/10 blur-[1px] mix-blend-difference"
        >
          {/* Inner Glow Center */}
          <div className="absolute inset-0 bg-white/30 blur-xl rounded-full" />
        </motion.div>
      )}

      {/* 💻 DESKTOP VERSION: Dot + Glow */}
      {!isMobile && (
        <>
          {/* 1. Fluid Glow (Laggy) */}
          <motion.div
            variants={glowVariants}
            animate="breathing"
            style={{
              ...baseStyle,
              x: glowSpring, 
              y: glowYSpring,
              width: 100,
              height: 100,
            }}
            className="z-[9997] rounded-full bg-white blur-[40px] mix-blend-difference"
          />

          {/* 2. Sharp Dot (Snappy) */}
          <motion.div
            style={{
              ...baseStyle,
              x: dotSpring,
              y: dotYSpring,
              width: 20,
              height: 20,
            }}
            className="z-[9999] rounded-full mix-blend-difference bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
