import { SectionHeading } from "@/components/ui/section-heading";
import { PortfolioChat } from "@/components/chat/portfolio-chat";
import { profile } from "@/data/profile";

const links = [
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    href: profile.linkedin,
    label: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="4.5" r="1.5" />
        <path d="M11 21v-12h4v1.5a5 5 0 0 1 7 4.5v6h-4v-6a1.5 1.5 0 0 0-3 0v6z" />
      </>
    ),
  },
  {
    href: profile.github,
    label: "GitHub",
    icon: (
      <>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3" />
        <path d="M15 22v-3.87a3.4 3.4 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.4 5.4 0 0 0 19 4.77 5 5 0 0 0 18.91 1S17.73.65 15 2.48a13.4 13.4 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5 5 0 0 0 4 4.77a5.4 5.4 0 0 0-1.5 3.78c0 5.46 3.3 6.65 6.44 7A3.4 3.4 0 0 0 8 18.13V22" />
      </>
    ),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-container mt-auto" id="contact">
      <div className="editorial-grid items-end pt-8 pb-8 md:pt-12 md:pb-10">
        <div className="col-span-4 md:col-span-12">
          <SectionHeading className="heading-text" id="contact-title" title="Hablemos" />
        </div>
        <div className="col-span-4 w-full md:col-span-12"><PortfolioChat /></div>
        <p className="col-span-4 mt-3 text-sm text-muted md:col-span-6 md:self-center">
          {profile.name}
        </p>
        <nav
          aria-label="Contacto y perfiles"
          className="col-span-4 mt-2 md:col-span-6 md:mt-4"
        >
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end md:gap-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  aria-label={link.label}
                  className="inline-flex size-11 items-center justify-center text-ink transition-colors duration-200 hover:text-accent-ink focus-visible:text-accent-ink"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="size-[22px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {link.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
