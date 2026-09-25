"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import TextType from "@/components/ui/TextType/TextType";
import FadeText from "@/components/ui/FadeText/FadeText";
import { projectsMeta, projects } from "@/Data/projectsData";

function ProjectPanel({ project, index, onVisible }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(index);
      },
      { threshold: 0.6, root: el.closest("[data-scroller]") }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <article
      ref={ref}
      data-panel
      data-animate
      className="group relative shrink-0 snap-center w-[88vw] sm:w-[75vw] lg:w-[52vw] xl:w-[46vw] opacity-0"
    >
      <div className="relative h-[62vh] sm:h-[68vh] overflow-hidden rounded-2xl bg-(--main-color)/5 border border-(--main-color)/10 transition-shadow duration-500 group-hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.18)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-[1.2s] ease-out "
          sizes="(max-width: 768px) 88vw, 50vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/5" />

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {project.category}
            </span>
            <span className="text-5xl md:text-6xl font-black text-white/15 leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-1">
              {project.company} · {project.period}
            </p>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
              {project.title}
            </h3>
            <FadeText
              as="p"
              text={project.description}
              delay={0.12}
              y={12}
              duration={0.8}
              className="text-sm md:text-base text-white/65 font-light leading-relaxed max-w-md mb-5 line-clamp-3"
            />

            <div className="flex flex-wrap items-center gap-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-white bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white hover:text-(--black-color) transition-colors"
                >
                  Live Site
                  <ArrowUpRight size={13} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-white/70 hover:text-white transition-colors"
                >
                  <BsGithub size={13} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-1 hidden lg:block">
        <p className="text-[10px] uppercase tracking-[0.35em] text-(--main-color)/40 mb-2">
          Highlights
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {project.highlights.map((item, i) => (
            <li key={item}>
              <FadeText
                as="span"
                text={item}
                delay={0.1 + i * 0.07}
                y={8}
                duration={0.65}
                className="text-xs text-(--main-color)/60"
              />
            </li>
          ))}
        </ul>
        <p className="text-xs text-(--main-color)/45 mt-3 font-light">
          {project.technologies.join(" · ")}
        </p>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
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
        gsap.set(animated, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(section.querySelector("[data-intro]"), { y: 30, opacity: 0 });
      gsap.set(section.querySelectorAll("[data-panel]"), { x: 80, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(section.querySelector("[data-intro]"), { opacity: 1, y: 0, duration: 0.8 }, 0)
        .to(
          section.querySelectorAll("[data-panel]"),
          { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 },
          0.2
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

  const scrollNext = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const panel = scroller.querySelector("[data-panel]");
    const gap = 24;
    const scrollAmount = (panel?.offsetWidth ?? 400) + gap;
    scroller.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-(--white-color) text-(--black-color)"
    >
      <div className="container pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Sticky intro */}
          <div
            data-intro
            data-animate
            className="lg:sticky lg:top-28 opacity-0"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-(--main-color)/50 mb-5">
              {projectsMeta.eyebrow}
            </p>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.02] mb-5">
              Crafted
              <span className="block text-(--main-color)/35">Products</span>
            </h2>

            <div className="text-sm md:text-base font-light leading-relaxed text-(--main-color)/75 mb-8 max-w-xs">
              <TextType
                as="p"
                text={projectsMeta.subtitle}
                loop={false}
                showCursor={false}
                startOnVisible
                typingSpeed={18}
                initialDelay={300}
              />
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div>
                <p className="text-3xl md:text-4xl font-black tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-(--main-color)/40 mt-1">
                  of {String(projects.length).padStart(2, "0")}
                </p>
              </div>
              <div className="h-12 w-px bg-(--main-color)/15" />
              <div className="max-w-[140px]">
                <p className="text-sm font-medium text-(--black-color) leading-snug">
                  {projects[activeIndex].title}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-(--main-color)/45 mt-1">
                  {projects[activeIndex].company}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollNext}
              className="hidden lg:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-(--main-color)/60 hover:text-(--black-color) transition-colors group"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-(--main-color)/20 group-hover:border-(--black-color)/40 group-hover:bg-(--black-color) group-hover:text-white transition-all">
                <ArrowRight size={14} />
              </span>
              Scroll gallery
            </button>
          </div>

          {/* Horizontal scroll gallery */}
          <div className="relative min-w-0">
            <div
              ref={scrollerRef}
              data-scroller
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mr-[5vw] pr-[5vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((project, index) => (
                <ProjectPanel
                  key={project.id}
                  project={project}
                  index={index}
                  onVisible={setActiveIndex}
                />
              ))}
            </div>

            {/* Progress track */}
            <div className="hidden lg:flex gap-1.5 mt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => {
                    const scroller = scrollerRef.current;
                    const panels = scroller?.querySelectorAll("[data-panel]");
                    panels?.[i]?.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                    setActiveIndex(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-10 bg-(--black-color)"
                      : "w-4 bg-(--main-color)/15 hover:bg-(--main-color)/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
