"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import StaggeredMenu from "@/components/ui/Menu/StaggeredMenu";
import { desktopNavItems, staggeredMenuItems } from "@/Data/navData";
import { SocialLinks } from "@/Data/socialData";
import { useLoading } from "@/components/AppShell";

const socialItems = SocialLinks.map((social) => ({
  label: social.name === "GitHup" ? "GitHub" : social.name,
  link: social.url,
}));

export default function Navbar() {
  const { isLoaded } = useLoading();
  const [isCompact, setIsCompact] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header
      className={`w-full py-2 sm:py-5 bg-(--white-color) text-(--main-color) fixed md:sticky top-0 left-0 z-50  transition-opacity duration-700 ${
        isLoaded ? "animate-down opacity-100" : "opacity-0"
      }`}
    >
      <div className="container flex items-center justify-between gap-3">
        <div className="flex items-center bg-(--white-color) px-3.5 py-1.5 sm:px-4 sm:py-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-2 shrink-0"></span>
          <span className="text-xs sm:text-sm font-medium">
            Available for New work
          </span>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-(--main-color)">
            {desktopNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  aria-label={item.ariaLabel}
                  className="cursor-pointer hover:text-(--black-color) transition-colors"
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-gray-400 text-xs ml-1">{item.badge}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
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


          {isCompact && (
            <StaggeredMenu
              embedded
              position="right"
              colors={["#c7c3c3", "#000000"]}
              accentColor="#c7c3c3"
              panelColor="#262626"
              panelTextColor="#ffffff"
              menuButtonColor="#262626"
              openMenuButtonColor="#262626"
              changeMenuColorOnOpen={false}
              items={staggeredMenuItems}
              socialItems={socialItems}
              displaySocials
              displayItemNumbering
              onMenuOpen={() => {
                document.body.style.overflow = "hidden";
              }}
              onMenuClose={() => {
                document.body.style.overflow = "";
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
