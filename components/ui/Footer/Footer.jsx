"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/Data/socialData";
import "./Footer.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MagneticButton = forwardRef(function MagneticButton(
  { className, children, as: Component = "button", ...props },
  forwardedRef
) {
  const localRef = useRef(null);

  useEffect(() => {
    const element = localRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cn("cursor-pointer", className)}
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
    >
      {children}
    </Component>
  );
});

const marqueeItems = [
  "Frontend Developer",
  "React & Next.js",
  "Available for Work",
  "Cairo, Egypt",
  "Clean Architecture",
];

function MarqueeItem() {
  return (
    <div className="flex items-center space-x-12 px-6">
      {marqueeItems.map((item, index) => (
        <span key={item} className="flex items-center space-x-12">
          <span>{item}</span>
          <span className={index % 2 === 0 ? "text-primary/60" : "text-secondary/60"}>✦</span>
        </span>
      ))}
    </div>
  );
}

function findSocial(name) {
  return SocialLinks.find((social) => social.name === name);
}

export default function Footer() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);

  const whatsapp = findSocial("Whatsapp");
  const github = findSocial("GitHub");
  const linkedin = findSocial("LinkedIn");

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const primaryLinks = [
    { ...whatsapp, label: "Let's Talk" },
    github,
  ].filter(Boolean);

  const secondaryLinks = [
    linkedin,
    { name: "Projects", url: "#projects" },
    { name: "About", url: "#about" },
  ].filter(Boolean);

  return (
    <div
      id="contact"
      ref={wrapperRef}
      className="relative h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground">
        <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
        <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          AHMED
        </div>

        <div className="absolute top-12 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/50 bg-background/60 py-4 shadow-2xl backdrop-blur-md">
          <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <h2
            ref={headingRef}
            className="footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl"
          >
            Let&apos;s work together
          </h2>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              {primaryLinks.map((link) => (
                <MagneticButton
                  key={link.name}
                  as="a"
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-foreground md:text-base"
                >
                  {link.icon && (
                    <span className="text-2xl text-muted-foreground transition-colors group-hover:text-foreground">
                      {link.icon}
                    </span>
                  )}
                  {link.label || link.name}
                </MagneticButton>
              ))}
            </div>

            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
              {secondaryLinks.map((link) => (
                <MagneticButton
                  key={link.name}
                  as="a"
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground md:text-sm"
                >
                  {link.icon && (
                    <span className="mr-2 inline-flex text-base align-middle">{link.icon}</span>
                  )}
                  {link.name}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <div className="order-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase md:order-1 md:text-xs">
            © 2026 Ahmed Sayed. All rights reserved.
          </div>


          <MagneticButton
            as="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <svg
              className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}
