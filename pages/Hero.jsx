"use client";
import React from "react";
import { SocialLinks } from "@/Data/socialData";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useLoading } from "@/components/AppShell";

export default function Hero() {
  const { isLoaded } = useLoading();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen md:min-h-[90vh] overflow-hidden pt-20 sm:pt-24"
    >
      <div className="container relative h-full min-h-[calc(100vh-5rem)] md:min-h-[calc(90vh-6rem)] flex flex-col justify-evenly md:justify-center xl:justify-evenly items-center">
      <div className={`top-4 text-center z-0 select-none pointer-events-none transition-opacity duration-700 ${isLoaded ? "animate-scale-in" : "opacity-0"}`}>
        <h1 className="text-[7vh] md:text-[9vw] font-black uppercase tracking-wider leading-none text-transparent [-webkit-text-stroke:2px_var(--black-color)] opacity-90">
          AHMED <span className="text-(--black-color)">SAYED</span>
        </h1>
      </div>


      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center mt-8 md:mt-24">
        
        <div className={`flex flex-col items-start text-left max-w-sm mb-10 md:mb-0 transition-opacity duration-700 ${isLoaded ? "animate-left" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-(--black-color)">
            Frontend Developer
          </h2>
          <p className="text-sm md:text-base mb-6 leading-relaxed text-(--main-color)">
            I design and ship scalable frontend products — blending React, Next.js, and AI integrations to build fast, reliable interfaces
          </p>
                    <a  
            href="https://wa.me/201067504693"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden border border-(--black-color) sm:flex items-center gap-2 overflow-hidden cursor-pointer  px-4 py-2 text-xs sm:text-sm font-medium text-(--black-color) transition-colors duration-500 ease-out hover:text-(--white-color) focus-visible:text-(--white-color)"
          >
            {/* white fill */}
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-(--black-color) transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />

            <span className="relative z-10 ">Let&apos;s Talk</span>

            <MdOutlineArrowOutward
              size={15}
              aria-hidden="true"
              className="relative z-10"
            />
          </a>
        </div>

        <div className={`flex flex-col gap-3 z-11 mt-0 self-end transition-opacity duration-700 ${isLoaded ? "animate-right" : "opacity-0"}`}>
          {SocialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 bg-(--white-color) px-5 py-2.5 text-sm font-medium text-(--black-color) shadow-sm transition-colors duration-500 ease-out hover:border-(--main-color) hover:text-(color:--white-color) focus-visible:border-(--main-color) focus-visible:text-(color:--white-color)"
            >
              {/* black fill */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-(--black-color) transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <span
                aria-hidden="true"
                className="relative z-10 flex items-center text-base text-(--main-color) group-hover:text-(--white-color) focus-visible:text-(--white-color)"
              >
                {social.icon}
              </span>

              <span className="relative z-10">{social.name}</span>
            </a>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
}
