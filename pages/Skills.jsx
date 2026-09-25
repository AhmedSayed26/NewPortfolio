"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TextType from "@/components/ui/TextType/TextType";
import {
  skillsMeta,
  skillsCategories,
  getSkillIcon,
} from "@/Data/skillsData";

const accentColors = ["#0891b2", "#7c3aed", "#059669", "#d97706"];

function SkillRow({ category, index, isActive, onActivate }) {
  const accent = accentColors[index % accentColors.length];

  return (
    <article
      data-row
      data-animate
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      className="group relative border-t border-(--main-color)/10 py-8 md:py-10 opacity-0 transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-10px] top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
        style={{ backgroundColor: accent }}
      />

      <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[minmax(0,320px)_1fr] gap-6 lg:gap-10 xl:gap-14">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.45em] mb-3 transition-colors duration-300"
            style={{ color: isActive ? accent : "rgba(38,38,38,0.45)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-(--black-color) mb-3">
            {category.title}
          </h3>

          <p className="text-sm md:text-[15px] leading-relaxed text-(--main-color)/75 font-light max-w-sm">
            {category.description}
          </p>
        </div>

        <div className="flex flex-wrap content-start gap-2 lg:pt-1">
          {category.tags.map((tag) => {
            const icon = getSkillIcon(tag);
            return (
              <span
                key={tag}
                data-tag
                data-animate
                className="inline-flex items-center gap-1.5 rounded-lg border border-(--main-color)/15 bg-(--white-color) px-3 py-2 text-xs text-(--main-color) transition-all duration-300 hover:-translate-y-0.5 hover:border-(--black-color)/25 hover:text-(--black-color) opacity-0"
              >
                {icon && (
                  <img
                    src={icon}
                    alt=""
                    className="h-3.5 w-3.5 opacity-70"
                    loading="lazy"
                  />
                )}
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const playedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const playEntrance = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animated = section.querySelectorAll("[data-animate]");

      if (reduceMotion) {
        gsap.set(animated, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(section.querySelector("[data-intro]"), { y: 24, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-row]"), { y: 28, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-tag]"), { y: 8, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(section.querySelector("[data-intro]"), { opacity: 1, y: 0, duration: 0.8 }, 0)
        .to(
          section.querySelectorAll("[data-row]"),
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
          0.15
        )
        .to(
          section.querySelectorAll("[data-tag]"),
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.01 },
          0.35
        );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) playEntrance();

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden bg-(--white-color) text-(--black-color)"
    >
      <div className="relative container py-24 md:py-32">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-12 lg:gap-16 xl:gap-24 items-start">
          <div
            data-intro
            data-animate
            className="lg:sticky lg:top-28 opacity-0"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-(--main-color)/50 mb-5">
              {skillsMeta.eyebrow}
            </p>

            <h2 className="text-4xl md:text-5xl xl:text-[3.4rem] font-black tracking-tight leading-[1.02] mb-5">
              Engineering
              <span className="block text-(--main-color)/35">Skills</span>
            </h2>

            <div className="text-sm md:text-base font-light leading-relaxed text-(--main-color)/75 mb-10 max-w-sm">
              <TextType
                as="p"
                text={skillsMeta.subtitle}
                loop={false}
                showCursor={false}
                startOnVisible
                typingSpeed={18}
                initialDelay={300}
              />
            </div>

            <div className="hidden lg:block space-y-3">
              {skillsCategories.map((category, index) => {
                const accent = accentColors[index % accentColors.length];
                const isActive = activeIndex === index;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="flex w-full items-center gap-3 text-left transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: accent,
                        transform: isActive ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                    <span className="text-xs uppercase tracking-[0.25em] text-(--black-color)/80">
                      {category.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 border-b border-(--main-color)/10">
            {skillsCategories.map((category, index) => (
              <SkillRow
                key={category.id}
                category={category}
                index={index}
                isActive={activeIndex === index}
                onActivate={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
