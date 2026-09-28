"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavigationItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

const SECTION_ITEMS: NavigationItem[] = [
  {
    id: "hero",
    number: "(01)",
    label: "Inicio",
    href: "/#main-content",
  },
  {
    id: "education",
    number: "(02)",
    label: "Educación",
    href: "/#education",
  },
  {
    id: "experience",
    number: "(03)",
    label: "Experiencia",
    href: "/#experience",
  },
  {
    id: "work",
    number: "(04)",
    label: "Proyectos",
    href: "/#work",
  },
  {
    id: "contact",
    number: "(05)",
    label: "Contacto",
    href: "/#contact",
  },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Dynamic active item determination
  const activeItem = pathname.startsWith("/projects/")
    ? SECTION_ITEMS.find((item) => item.id === "work") || SECTION_ITEMS[3]
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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setIsOpen(false);

      if (pathname === "/") {
        if (href === "/#main-content" || href === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else if (href.startsWith("/#")) {
          const targetId = href.replace("/#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth" });
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

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset open state when navigating between routes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-[10001] w-full bg-[var(--canvas)]"
      data-site-header
    >
      <div className="site-container">
        <div className="relative">
          <div className="grid min-h-18 grid-cols-[1fr_auto_1fr] items-center">
            {/* Esquina superior izquierda: Nombre */}
            <div className="justify-self-start">
              <Link
                className="inline-flex min-h-11 items-center font-mono text-xs font-normal uppercase tracking-[-0.025em] text-ink transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-signal"
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
              >
                <span>Bruno Esteve</span>
                <span className="hidden sm:inline">&nbsp;Castellano</span>
              </Link>
            </div>

            {/* Centro: Indicador dinámico de sección (inicialmente 'INICIO') */}
            <div className="justify-self-center">
              <Link
                className="inline-flex min-h-11 items-center font-mono text-xs font-normal uppercase tracking-wider text-ink transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-signal md:tracking-widest"
                href={activeItem.href}
                onClick={(e) => handleNavClick(e, activeItem.href)}
                aria-label={`Sección activa: ${activeItem.label}. Ir a ${activeItem.label}`}
              >
                <span key={activeItem.id} className="transition-opacity duration-200">
                  {activeItem.label}
                </span>
              </Link>
            </div>

            {/* Esquina superior derecha: Símbolo de menú desplegable */}
            <div className="justify-self-end">
              <button
                ref={buttonRef}
                type="button"
                aria-expanded={isOpen}
                aria-controls="site-dropdown-menu"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú de apartados"}
                onClick={() => setIsOpen((prev) => !prev)}
                className="group inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end text-ink transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-signal"
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
            </div>
          </div>

          {/* Menú desplegable */}
          <div
            id="site-dropdown-menu"
            ref={menuRef}
            role="region"
            aria-label="Apartados de la página"
            className={`absolute top-full right-0 w-full bg-[var(--surface)] p-6 shadow-[0_24px_48px_-12px_rgba(18,20,22,0.12)] transition-all duration-200 ease-out origin-top-right sm:w-[380px] md:w-[420px] md:p-8 ${
              isOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <nav aria-label="Navegación de apartados">
              <ul className="flex flex-col space-y-2">
                {SECTION_ITEMS.map((item) => {
                  const isCurrent = activeItem.id === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`group flex items-baseline gap-4 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-signal sm:py-3 ${
                          isCurrent ? "text-signal font-medium" : "hover:text-signal"
                        }`}
                      >
                        <span
                          className={`font-mono text-xs tabular-nums transition-colors ${
                            isCurrent
                              ? "text-signal font-semibold"
                              : "text-muted group-hover:text-signal"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`font-display text-2xl font-normal uppercase tracking-[-0.04em] transition-colors sm:text-3xl ${
                            isCurrent ? "text-signal" : "text-ink group-hover:text-signal"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop transparente / sutil para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 top-18 z-[-1] bg-black/[0.04] transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

