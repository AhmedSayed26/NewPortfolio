"use client";
import React, { useState, useEffect } from "react";
import {
  MdHome,
  MdPerson,
  MdWork,
  MdDesignServices,
  MdTimeline,
  MdEmail,
  MdFolder,
  MdCode,
} from "react-icons/md";
import { menuItems } from "@/Data/navData";

const sectionIcons = {
  home: <MdHome size={20} />,
  about: <MdPerson size={20} />,
  skills: <MdCode size={20} />,
  work: <MdWork size={20} />,
  services: <MdDesignServices size={20} />,
  experience: <MdTimeline size={20} />,
  projects: <MdFolder size={20} />,
  contact: <MdEmail size={20} />,
};

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      menuItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3 bg-white/75 backdrop-blur-md border border-black/20 rounded-full py-3 px-1">
      {menuItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.link}
            className="group relative flex items-center justify-center p-2 cursor-pointer"
            aria-label={item.ariaLabel}
          >
            <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
              {item.label}
            </span>

            <span
              className={`transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? "text-black scale-125 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                  : "text-gray-500 group-hover:text-black"
              }`}
            >
              {sectionIcons[item.id]}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
