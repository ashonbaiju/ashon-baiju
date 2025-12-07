"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

const CustomCursor = () => {
  // 1. Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Touch + velocity for mobile "throw"
  const isTouchingRef = useRef(false);
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    time: 0,
  });

  // ------------------------------------------------------------------
  // 🔹 HYDRATION + DEVICE CHECK
  // ------------------------------------------------------------------
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
  // 🔹 PHYSICS ENGINE
  // ------------------------------------------------------------------

  // Desktop: fast dot
  const dotConfig = { stiffness: 500, damping: 35, mass: 0.5 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Mobile: tight & sticky, Desktop: loose & floaty
  const glowConfig = isMobile
    ? { stiffness: 600, damping: 30, mass: 0.5 }
    : { stiffness: 150, damping: 20, mass: 1.5 };

  const glowX = useSpring(cursorX, glowConfig);
  const glowY = useSpring(cursorY, glowConfig);

  const smoothOpacity = useSpring(cursorOpacity, {
    stiffness: 300,
    damping: 20,
  });

  // ------------------------------------------------------------------
  // 🔹 CORE LOGIC
  // ------------------------------------------------------------------

  const updatePosition = (x, y) => {
    const now = performance.now();
    const v = velocityInfo.current;

    // Velocity tracking for throw
    v.prevX = v.lastX;
    v.prevY = v.lastY;
    v.lastX = x;
    v.lastY = y;
    v.time = now;

    cursorX.set(x);
    cursorY.set(y);
    cursorOpacity.set(1);
  };

  const triggerThrow = () => {
    const now = performance.now();
    const v = velocityInfo.current;

    // If finger stayed still too long, skip throw
    if (now - v.time > 50) return;

    const dt = Math.max(now - v.time, 10);
    const vx = (v.lastX - v.prevX) / dt;
    const vy = (v.lastY - v.prevY) / dt;

    const throwPower = isMobile ? 400 : 200;

    const targetX = v.lastX + vx * throwPower;
    const targetY = v.lastY + vy * throwPower;

    const throwSpring = { type: "spring", stiffness: 50, damping: 20 };

    const maxX =
      typeof window !== "undefined" ? window.innerWidth : 1000;
    const maxY =
      typeof window !== "undefined" ? window.innerHeight : 1000;

    animate(
      cursorX,
      Math.min(Math.max(targetX, 0), maxX),
      throwSpring
    );
    animate(
      cursorY,
      Math.min(Math.max(targetY, 0), maxY),
      throwSpring
    );
  };

  // ------------------------------------------------------------------
  // 🔹 EVENT LISTENERS (SEPARATE FOR MOBILE & DESKTOP)
  // ------------------------------------------------------------------

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // ========== 📱 MOBILE LOGIC ==========
    if (isMobile) {
      const onTouchStart = (e) => {
        isTouchingRef.current = true;
        const t = e.touches[0];
        if (t) updatePosition(t.clientX, t.clientY);
      };

      const onTouchMove = (e) => {
        // Follow fingertip exactly, even while user scrolls
        const t = e.touches[0];
        if (t) updatePosition(t.clientX, t.clientY);
      };

      const onTouchEnd = () => {
        isTouchingRef.current = false;
        triggerThrow(); // optional “throw” after lifting
      };

      const onTouchCancel = () => {
        isTouchingRef.current = false;
      };

      window.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", onTouchMove, {
        passive: true,
      });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("touchcancel", onTouchCancel);

      // No scroll-drag on mobile:
      // The circle only follows the finger, not the page.
      return () => {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchCancel);
      };
    }

    // ========== 💻 DESKTOP LOGIC ==========
    let lastScrollY = window.scrollY;

    const onMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      cursorOpacity.set(0);
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Scroll inertia effect only on desktop
      const currentY = cursorY.get();
      cursorY.set(currentY - delta * 0.8);
    };

    window.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });
    window.addEventListener("mouseleave", onMouseLeave, {
      passive: true,
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, isMobile, cursorOpacity, cursorY, updatePosition]);

  if (!mounted) return null;

  // ------------------------------------------------------------------
  // 🔹 RENDER
  // ------------------------------------------------------------------

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    opacity: smoothOpacity,
    // Correct centering for both x/y motion values:
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {/* 📱 MOBILE: Sticky Finger Ring */}
      {isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            ...baseStyle,
            x: glowX,
            y: glowY,
            width: 80,
            height: 80,
          }}
          className="z-[9999] rounded-full border-2 border-white/30 bg-white/10 blur-[1px] mix-blend-difference shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        />
      )}

      {/* 💻 DESKTOP: Dot + Ambient Glow */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              ...baseStyle,
              x: glowX,
              y: glowY,
              width: 120,
              height: 120,
            }}
            className="z-[9997] rounded-full bg-white blur-[45px] mix-blend-difference"
          />

          <motion.div
            style={{
              ...baseStyle,
              x: dotX,
              y: dotY,
              width: 16,
              height: 16,
            }}
            className="z-[9999] rounded-full mix-blend-difference bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
