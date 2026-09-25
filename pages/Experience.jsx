"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import FadeText from "@/components/ui/FadeText/FadeText";
import {
  experienceMeta,
  experiences,
  getTechIcon,
} from "@/Data/experienceData";

function ExperienceEntry({ job, index, isLast }) {
  return (
    <article data-entry data-animate className="relative opacity-0">
      <div className="grid lg:grid-cols-[140px_1fr] xl:grid-cols-[180px_1fr] gap-6 lg:gap-10 xl:gap-16">
        {/* Timeline column */}
        <div className="relative flex lg:flex-col lg:items-end gap-4 lg:gap-0">
          <time className="text-xs whitespace-nowrap md:text-sm font-medium uppercase tracking-[0.25em] text-(--main-color)/55 lg:text-right lg:pt-2">
            {job.period}
          </time>

           <div className="hidden lg:flex flex-col items-end flex-1 min-h-full">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-(--black-color) bg-(--white-color) shrink-0 mt-3" />
            {/* {!isLast && ( */}
              <span className="w-px flex-1 min-h-[80px] bg-(--main-color)/15 mt-3" />
            {/* )} */}
          </div> 
        </div>

        {/* Content */}
        <div className="pb-14 md:pb-20">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5 md:mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-(--main-color)/45 mb-2">
                {String(index + 1).padStart(2, "0")} — {job.type}
              </p>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight text-(--black-color) mb-1">
                {job.role}
              </h3>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-(--main-color) hover:text-(--black-color) transition-colors group/link"
              >
                {job.company}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <span className="text-xs text-(--main-color)/50 uppercase tracking-wider">
              {job.location}
            </span>
          </div>

          <FadeText
            as="p"
            text={job.summary}
            delay={0.12}
            y={12}
            duration={0.8}
            className="text-base md:text-lg leading-relaxed text-(--main-color) font-light mb-8 md:mb-10 max-w-3xl"
          />

          {/* Contributions — horizontal numbered strip */}
          <div className="mb-8 md:mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-(--main-color)/45 mb-5">
              Key Contributions
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-px bg-(--main-color)/10 rounded-xl overflow-hidden">
              {job.contributions.map((item, i) => (
                <div
                  key={item.title}
                  data-contribution
                  data-animate
                  className="bg-(--white-color) p-4 md:p-5 opacity-0"
                >
                  <span className="block text-2xl md:text-3xl font-black text-(--black-color)/8 leading-none mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-semibold text-(--black-color) mb-1.5">
                    {item.title}
                  </h4>
                  <FadeText
                    as="p"
                    text={item.description}
                    delay={0.08 + i * 0.05}
                    y={8}
                    duration={0.65}
                    className="text-xs md:text-sm leading-relaxed text-(--main-color)/80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tech pills + highlights row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.4em] text-(--main-color)/45 mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => {
                  const icon = getTechIcon(tech);
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-(--main-color)/15 bg-(--white-color) text-xs text-(--main-color) transition-colors hover:border-(--black-color)/30 hover:text-(--black-color)"
                    >
                      {icon && (
                        <img src={icon} alt="" className="w-3.5 h-3.5 opacity-70" loading="lazy" />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="lg:max-w-xs xl:max-w-sm">
              <p className="text-[10px] uppercase tracking-[0.4em] text-(--main-color)/45 mb-3">
                Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {job.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-(--black-color)/70 bg-(--main-color)/8 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
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
        gsap.set(animated, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(section.querySelector("[data-title-top]"), { y: 50, opacity: 0 });
      gsap.set(section.querySelector("[data-title-bottom]"), { y: -30, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-entry]"), { y: 40, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-contribution]"), { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(section.querySelector("[data-title-top]"), { opacity: 1, y: 0, duration: 0.9 }, 0)
        .to(section.querySelector("[data-title-bottom]"), { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .to(
          section.querySelectorAll("[data-entry]"),
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.25 },
          0.4
        )
        .to(
          section.querySelectorAll("[data-contribution]"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
          0.55
        );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) playEntrance();

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full overflow-hidden bg-(--white-color) text-(--black-color)"
    >
      {/* Header */}
      <div className="container pt-24 md:pt-32 pb-16 md:pb-20">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-(--main-color)/50 mb-6 md:mb-8 text-center">
          {experienceMeta.eyebrow}
        </p>

        <h2 className="font-black uppercase leading-[0.85] tracking-tighter text-center select-none">
          <span
            data-title-top
            data-animate
            className="block text-[18vw] md:text-[12vw] text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.12)] opacity-0"
          >
            Work
          </span>
          <span
            data-title-bottom
            data-animate
            className="block text-[15vw] md:text-[10vw] mt-[4vw] md:mt-1 text-(--black-color) opacity-0"
          >
            Experience
          </span>
        </h2>

        <FadeText
          as="p"
          text={experienceMeta.subtitle}
          delay={0.25}
          y={20}
          duration={0.7}
          className="mt-8 md:mt-10 mx-auto max-w-xl text-center text-base md:text-lg font-light leading-relaxed text-(--main-color)"
        />
      </div>

      {/* Timeline entries */}
      <div className="container pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          {experiences.map((job, index) => (
            <ExperienceEntry
              key={job.id}
              job={job}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
