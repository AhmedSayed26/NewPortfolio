"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Loader.css";

export default function Loader({ onComplete, duration = 2200 }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const barRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    const name = nameRef.current;
    const bar = barRef.current;
    const content = contentRef.current;

    if (!root || !counter || !name || !bar || !content) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      counter.textContent = "100";
      onComplete?.();
      root.style.display = "none";
      return;
    }

    document.body.style.overflow = "hidden";

    const counterState = { value: 0 };

    const timeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    timeline
      .set(root, { y: 0 })
      .fromTo(
        content,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
      .fromTo(
        name,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.15
      )
      .to(
        counterState,
        {
          value: 100,
          duration: duration / 1000 - 0.6,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(counterState.value)).padStart(2, "0");
          },
        },
        0.2
      )
      .to(
        bar,
        {
          scaleX: 1,
          duration: duration / 1000 - 0.6,
          ease: "power2.inOut",
        },
        0.2
      )
      .to(content, { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, "-=0.15")
      .add(() => onComplete?.())
      .to(root, { y: "-100%", duration: 0.75, ease: "power4.inOut" });

    return () => {
      timeline.kill();
      document.body.style.overflow = "";
    };
  }, [duration, onComplete]);

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div ref={contentRef} className="loader__content">
        <span ref={counterRef} className="loader__counter">
          00
        </span>
        <span ref={nameRef} className="loader__name">
          Ahmed Sayed Frontend Developer
        </span>
      </div>

      <div className="loader__bar-track" aria-hidden="true">
        <div ref={barRef} className="loader__bar-fill" />
      </div>
    </div>
  );
}
