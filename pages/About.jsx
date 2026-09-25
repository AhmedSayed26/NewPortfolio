"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lanyard from "@/components/ui/Lanyard/Lanyard";
import TextType from "@/components/ui/TextType/TextType";
import { aboutData } from "@/Data/aboutData";

export default function About() {
  const sectionRef = useRef(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const playEntrance = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animated = section.querySelectorAll("[data-animate]");

      if (reduceMotion) {
        gsap.set(animated, { opacity: 1, y: 0, scale: 1, scaleX: 1, rotate: 0 });
        return;
      }

      gsap.set(section.querySelectorAll("[data-line]"), {
        scaleX: 0,
        transformOrigin: "center",
      });
      gsap.set(section.querySelector("[data-eyebrow]"), { y: 20 });
      gsap.set(section.querySelector("[data-title-top]"), { y: 60 });
      gsap.set(section.querySelector("[data-title-bottom]"), { y: -40 });
      gsap.set(section.querySelectorAll("[data-panel]"), { y: 48, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-block]"), { y: 36 });
      gsap.set(section.querySelectorAll("[data-skill]"), { y: 12, scale: 0.92 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(section.querySelectorAll("[data-line]"), {
        scaleX: 1,
        duration: 1,
        stagger: 0.1,
      })
        .to(section.querySelector("[data-eyebrow]"), { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .to(section.querySelector("[data-title-top]"), { opacity: 1, y: 0, duration: 1 }, 0.15)
        .to(
          section.querySelector("[data-title-bottom]"),
          { opacity: 1, y: 0, duration: 1 },
          0.25
        )
        .to(
          section.querySelectorAll("[data-panel]"),
          { opacity: 1, y: 0, duration: 1.6, stagger: 0.35, ease: "power2.out" },
          0.65
        )
        .to(
          section.querySelectorAll("[data-block]"),
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          0.85
        )
        .to(
          section.querySelectorAll("[data-skill]"),
          { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.03 },
          1.05
        );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(section);

    // Hash link / already visible (e.g. short viewport)
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) playEntrance();

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-[var(--black-color)] overflow-hidden"
    >
      {/* Hero */}
      <div className="relative w-full min-h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] rounded-full blur-[120px] opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="text-center">
            <div
              data-eyebrow
              data-animate
              className="flex items-center justify-center gap-4 mb-4 md:mb-6 opacity-0"
            >
              <span
                data-line
                data-animate
                className="h-px w-10 md:w-16 bg-linear-to-r from-transparent to-white/20"
              />
              <p className="text-[10px] md:text-xs font-light uppercase tracking-[0.55em] text-white/35">
                Who I Am
              </p>
              <span
                data-line
                data-animate
                className="h-px w-10 md:w-16 bg-linear-to-l from-transparent to-white/20"
              />
            </div>

            <h2 className="font-black uppercase leading-[0.82] tracking-tighter">
              <span
                data-title-top
                data-animate
                className="block text-[22vw] md:text-[16vw] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.12)] opacity-0"
              >
                Abo
              </span>
              <span
                data-title-bottom
                data-animate
                className="block text-[22vw] md:text-[16vw] -mt-[2vw] md:-mt-[1.2vw] bg-linear-to-b from-white/25 via-white/10 to-white/5 bg-clip-text text-transparent opacity-0"
              >
                ut
              </span>
            </h2>
          </div>
        </div>

        <div className="hidden lg:block absolute inset-0 z-[5] pointer-events-none">
          <div className="container h-full flex items-center justify-between">
            <div
              data-panel
              data-animate
              className="max-w-[240px] xl:max-w-[280px] opacity-0"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">
                Summary
              </p>
              <p className="text-sm leading-relaxed text-white/55 font-light">
                {aboutData.objective2.slice(0, 120)}…
              </p>
            </div>

            <div data-panel data-animate className="max-w-[200px] opacity-0">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">
                At a Glance
              </p>
              <ul className="space-y-3">
                {aboutData.stats.map(stat => (
                  <li key={stat.label} className="border-l border-white/10 pl-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/30">
                      {stat.label}
                    </p>
                    <p className="text-sm font-medium text-white/70">{stat.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="relative z-10">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -80, 0]}
            frontImage="/projects/about.jpg"
            lanyardWidth={1}
          />
        </div> */}
      </div>

      {/* Content */}
      <div className="relative z-20 container pb-24 md:pb-32 -mt-8 md:-mt-16">
        <div data-block data-animate className="max-w-3xl mx-auto mb-16 md:mb-24 opacity-0">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-white/30 mb-5">
            Profile
          </p>
          <p className="relative text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/80">
            <span aria-hidden="true" className="invisible block select-none">
              {aboutData.objective}
            </span>
            <span className="absolute inset-0">
              <TextType
                as="span"
                text={aboutData.objective}
                loop={false}
                showCursor={false}
                startOnVisible
                typingSpeed={20}
                initialDelay={700}
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
