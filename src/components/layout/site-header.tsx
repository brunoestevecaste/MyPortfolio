"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const SECTION_ITEMS: NavigationItem[] = [
  {
    id: "hero",
    label: "Inicio",
    href: "/#main-content",
  },
  {
    id: "education",
    label: "Educación",
    href: "/#education",
  },
  {
    id: "experience",
    label: "Experiencia",
    href: "/#experience",
  },
  {
    id: "work",
    label: "Proyectos",
    href: "/#work",
  },
  {
    id: "contact",
    label: "Contacto",
    href: "/#contact",
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const [activeProjectSection, setActiveProjectSection] = useState<NavigationItem>({
    id: "resumen",
    label: "Resumen",
    href: "#resumen",
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isProject = pathname.startsWith("/projects/");

  // Dynamic active item determination
  const activeItem = isProject
    ? activeProjectSection
    : SECTION_ITEMS.find((item) => item.id === activeSectionId) || SECTION_ITEMS[0];

  // Scroll spy to update the active section dynamically
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScroll = () => {
      // Bottom of page detection for Contact
      const scrollBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollBottom < 80) {
        setActiveSectionId("contact");
        return;
      }

      // Trigger line: about 35% down viewport or 260px
      const triggerLine = window.scrollY + Math.min(window.innerHeight * 0.35, 260);

      const contactEl = document.getElementById("contact");
      const workEl = document.getElementById("work");
      const experienceEl = document.getElementById("experience");
      const educationEl = document.getElementById("education");

      if (contactEl && triggerLine >= contactEl.offsetTop) {
        setActiveSectionId("contact");
      } else if (workEl && triggerLine >= workEl.offsetTop) {
        setActiveSectionId("work");
      } else if (experienceEl && triggerLine >= experienceEl.offsetTop) {
        setActiveSectionId("experience");
      } else if (educationEl && triggerLine >= educationEl.offsetTop) {
        setActiveSectionId("education");
      } else {
        setActiveSectionId("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isProject) return;

    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const triggerLine = Math.min(window.innerHeight * 0.35, 260);
      const sections = document.querySelectorAll<HTMLElement>("[data-project-section]");
      let current = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= triggerLine) current = section;
      }

      if (current) {
        const id = current.id;
        const label = current.dataset.projectSection || "Resumen";
        setActiveProjectSection((previous) =>
          previous.id === id && previous.label === label
            ? previous
            : { id, label, href: `#${id}` }
        );
      }
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };

    // Observe content arrival and reflow as well as scrolling between sections.
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.getElementById("main-content");
    if (main) observer.observe(main);
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isProject, pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      setIsOpen(false);
      if (headerRef.current?.querySelector("nav")?.contains(e.currentTarget)) {
        buttonRef.current?.focus({ preventScroll: true });
      }
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth";

      if (pathname === "/") {
        if (href === "/#main-content" || href === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior });
          window.history.pushState(null, "", "/");
        } else if (href.startsWith("/#")) {
          const targetId = href.replace("/#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior });
            window.history.pushState(null, "", href);
          }
        }
      }
    },
    [pathname]
  );

  // Close on Escape key and return focus to toggle button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  // Reset open state when navigating between routes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setActiveProjectSection({ id: "resumen", label: "Resumen", href: "#resumen" });
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[10001] w-full bg-[var(--canvas)]"
      data-site-header
      data-menu-open={isOpen}
    >
      <div className="site-container">
        <div className="relative">
          <div
            className={`grid min-h-18 items-center ${
              isProject
                ? "grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] gap-2 sm:grid-cols-[1fr_auto_1fr]"
                : "grid-cols-[1fr_auto_1fr]"
            }`}
          >
            <Link
              className="inline-flex min-h-11 items-center justify-self-start font-mono text-xs font-normal uppercase tracking-[-0.025em] text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent"
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
            >
              <span>Bruno Esteve</span>
              <span className="hidden sm:inline">&nbsp;Castellano</span>
            </Link>

            <div className="header-active-section min-w-0 justify-self-center text-center" inert={isOpen}>
              <Link
                className="inline-flex min-h-11 items-center font-mono text-xs font-normal uppercase tracking-wider text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent md:tracking-widest"
                href={activeItem.href}
                onClick={(e) => handleNavClick(e, activeItem.href)}
                aria-label={`Sección activa: ${activeItem.label}. Ir a ${activeItem.label}`}
              >
                {activeItem.label}
              </Link>
            </div>

            {isProject ? (
              <Link
                href="/#work"
                aria-label="Volver a proyectos"
                className="inline-flex min-h-11 min-w-11 items-center justify-end justify-self-end text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M20 12H4m7-7-7 7 7 7" />
                </svg>
              </Link>
            ) : (
              <button
                ref={buttonRef}
                type="button"
                aria-expanded={isOpen}
                aria-controls="site-header-menu"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú de apartados"}
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end justify-self-end text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span
                  className="relative flex size-5 flex-col items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className={`h-[1.5px] w-5 bg-current transition-transform duration-200 ease-out ${
                      isOpen ? "translate-y-[0.75px] rotate-45" : "-translate-y-1"
                    }`}
                  />
                  <span
                    className={`h-[1.5px] w-5 bg-current transition-transform duration-200 ease-out ${
                      isOpen ? "-translate-y-[0.75px] -rotate-45" : "translate-y-1"
                    }`}
                  />
                </span>
              </button>
            )}
          </div>

          {!isProject && (
            <div className="header-menu" id="site-header-menu" inert={!isOpen}>
              <div className="header-menu-clip">
                <nav className="header-menu-nav" aria-label="Navegación de apartados">
                  <ul className="header-menu-items">
                    {SECTION_ITEMS.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          aria-current={activeItem.id === item.id ? "location" : undefined}
                          className="header-menu-link inline-flex min-h-11 items-center font-mono text-xs uppercase transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
