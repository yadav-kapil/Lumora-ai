// useLenis.js
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function useLenis() {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,                 // smooth feel
      lerp: 0.08,                   // key smoothness control
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return lenisRef; // gives access if needed
}