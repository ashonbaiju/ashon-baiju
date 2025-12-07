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
      // Use window for touch events to capture everything
      const target = window;

      const handleTouchStart = (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          activeTouchId.current = touch.identifier;
          updatePosition(touch.clientX, touch.clientY);
          e.preventDefault(); // Prevent default to ensure smooth tracking
        }
      };

      const handleTouchMove = (e) => {
        if (activeTouchId.current !== null) {
          // Find the active touch
          for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            if (touch.identifier === activeTouchId.current) {
              // This is the key: Update position on EVERY touchmove
              updatePosition(touch.clientX, touch.clientY);
              
              // Optional: Add a tiny glow effect on fast movement
              const v = velocityInfo.current;
              const velocity = Math.abs(v.lastX - v.prevX) + Math.abs(v.lastY - v.prevY);
              if (velocity > 20) {
                cursorOpacity.set(0.8);
              }
              break;
            }
          }
        }
        // Prevent default to allow smooth scrolling with cursor following
        e.preventDefault();
      };

      const handleTouchEnd = (e) => {
        if (e.touches.length === 0) {
          activeTouchId.current = null;
          triggerThrow();
          
          // Smooth fade out
          animate(cursorOpacity, 0, {
            duration: 0.3,
            ease: "easeOut"
          });
        } else {
          // If multiple touches, find if our active touch ended
          for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === activeTouchId.current) {
              activeTouchId.current = null;
              triggerThrow();
              
              // Smooth fade out
              animate(cursorOpacity, 0, {
                duration: 0.3,
                ease: "easeOut"
              });
              break;
            }
          }
        }
      };

      const handleTouchCancel = () => {
        activeTouchId.current = null;
        animate(cursorOpacity, 0, {
          duration: 0.2,
          ease: "easeOut"
        });
      };

      // Use capture phase to ensure we get all touch events
      target.addEventListener("touchstart", handleTouchStart, { 
        passive: false, // Non-passive to allow preventDefault
        capture: true 
      });
      target.addEventListener("touchmove", handleTouchMove, { 
        passive: false, // Non-passive to allow preventDefault
        capture: true 
      });
      target.addEventListener("touchend", handleTouchEnd, { 
        passive: true,
        capture: true 
      });
      target.addEventListener("touchcancel", handleTouchCancel, { 
        passive: true,
        capture: true 
      });

      return () => {
        target.removeEventListener("touchstart", handleTouchStart, { capture: true });
        target.removeEventListener("touchmove", handleTouchMove, { capture: true });
        target.removeEventListener("touchend", handleTouchEnd, { capture: true });
        target.removeEventListener("touchcancel", handleTouchCancel, { capture: true });
      };
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

  if (!mounted) return null;

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
      {/* 📱 MOBILE: fingertip ring with glow pulse */}
      {isMobile && (
        <>
          {/* Outer glow pulse */}
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...baseStyle,
              x: glowX,
              y: glowY,
              width: 85,
              height: 85,
            }}
            className="rounded-full border-2 border-white/50 bg-white/10 mix-blend-difference blur-[2px]"
          />
          
          {/* Main cursor ring */}
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...baseStyle,
              x: glowX,
              y: glowY,
              width: 50,
              height: 50,
            }}
            className="rounded-full border-2 border-white mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
          
          {/* Inner dot */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...baseStyle,
              x: glowX,
              y: glowY,
              width: 12,
              height: 12,
            }}
            className="rounded-full bg-white mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
        </>
      )}

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
