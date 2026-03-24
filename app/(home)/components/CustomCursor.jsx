"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const CustomCursor = () => {
  // 1. Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Touch velocity for optional "throw"
  const velocityInfo = useRef({
    prevX: 0,
    prevY: 0,
    lastX: 0,
    lastY: 0,
    time: 0,
  });

  // Track active touch
  const activeTouchId = useRef(null);

  // Hydration + mobile check
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
  // 🔹 PHYSICS
  // ------------------------------------------------------------------

  // Desktop: fast dot
  const dotConfig = { stiffness: 500, damping: 35, mass: 0.5 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Mobile: tighter spring for immediate fingertip following
  const mobileConfig = { stiffness: 1200, damping: 30, mass: 0.3 };
  const glowX = useSpring(cursorX, isMobile ? mobileConfig : { stiffness: 140, damping: 22, mass: 1.5 });
  const glowY = useSpring(cursorY, isMobile ? mobileConfig : { stiffness: 140, damping: 22, mass: 1.5 });

  const smoothOpacity = useSpring(cursorOpacity, {
    stiffness: 300,
    damping: 20,
  });

  // ------------------------------------------------------------------
  // 🔹 CORE LOGIC
  // ------------------------------------------------------------------

  const updatePosition = useCallback(
    (x, y) => {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const v = velocityInfo.current;

      v.prevX = v.lastX;
      v.prevY = v.lastY;
      v.lastX = x;
      v.lastY = y;
      v.time = now;

      cursorX.set(x);
      cursorY.set(y);
      cursorOpacity.set(1);
    },
    [cursorX, cursorY, cursorOpacity]
  );

  const triggerThrow = useCallback(() => {
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const v = velocityInfo.current;

    // if finger stayed still, don't throw
    if (now - v.time > 80) return;

    const dt = Math.max(now - v.time, 10);
    const vx = (v.lastX - v.prevX) / dt;
    const vy = (v.lastY - v.prevY) / dt;

    const throwPower = isMobile ? 380 : 220;

    const targetX = v.lastX + vx * throwPower;
    const targetY = v.lastY + vy * throwPower;

    const throwSpring = { type: "spring", stiffness: 55, damping: 20 };

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
  }, [cursorX, cursorY, isMobile]);

  // ------------------------------------------------------------------
  // 🔹 EVENT LISTENERS - FIXED FOR MOBILE
  // ------------------------------------------------------------------

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // ========== 📱 MOBILE ==========
    if (isMobile) {
      return; // Disable custom cursor logic entirely on mobile to prevent massive lag
    }

    // ========== 💻 DESKTOP ==========
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

      // slight scroll inertia on desktop only
      const currentY = cursorY.get();
      cursorY.set(currentY - delta * 0.8);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, isMobile, updatePosition, triggerThrow, cursorOpacity, cursorY]);

  if (!mounted || isMobile) return null;

  // ------------------------------------------------------------------
  // 🔹 RENDER
  // ------------------------------------------------------------------

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    opacity: smoothOpacity,
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  return (
    <>
      {/* 💻 DESKTOP: ambient glow + dot */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.35, 0.7, 0.35],
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.7)",
                "0 0 20px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...baseStyle,
              x: glowX,
              y: glowY,
              width: 130,
              height: 130,
              zIndex: 9997,
            }}
            className="rounded-full bg-white mix-blend-difference blur-[40px]"
          />

          <motion.div
            style={{
              ...baseStyle,
              x: dotX,
              y: dotY,
              width: 16,
              height: 16,
            }}
            className="rounded-full bg-white mix-blend-difference shadow-[0_0_14px_rgba(255,255,255,1)]"
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
