export const menuItems = [
  {
    id: "home",
    label: "Home",
    link: "#home",
    ariaLabel: "Go to home section",
    showInDesktopNav: false,
  },
  {
    id: "about",
    label: "About",
    link: "#about",
    ariaLabel: "Go to about section",
  },
  {
    id: "experience",
    label: "Experience",
    link: "#experience",
    ariaLabel: "Go to experience section",
    badge: "[2y+]",
  },
  // {
  //   id: "skills",
  //   label: "Skills",
  //   link: "#skills",
  //   ariaLabel: "Go to skills section",
  // },
  {
    id: "projects",
    label: "Projects",
    link: "#projects",
    ariaLabel: "Go to projects section",
    badge: "",
  },
  {
    id: "contact",
    label: "Contact",
    link: "#contact",
    ariaLabel: "Go to contact section",
  },
];

export const desktopNavItems = menuItems.filter(
  (item) => item.showInDesktopNav !== false
);

export const staggeredMenuItems = desktopNavItems.map(
  ({ label, link, ariaLabel }) => ({
    label,
    link,
    ariaLabel,
  })
);
