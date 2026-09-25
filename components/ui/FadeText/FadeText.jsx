"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FadeText({
  as: Tag = "p",
  text,
  className = "",
  delay = 0,
  startOnVisible = true,
  duration = 0.9,
  y = 16,
}) {
  const ref = useRef(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
      );
    };

    if (!startOnVisible) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) animate();

    return () => observer.disconnect();
  }, [delay, duration, y, startOnVisible]);

  return (
    <Tag ref={ref} className={`opacity-0 ${className}`.trim()}>
      {text}
    </Tag>
  );
}
