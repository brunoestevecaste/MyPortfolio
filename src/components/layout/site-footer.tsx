const links = [
  {
    href: "mailto:brunoestevecaste@gmail.com",
    label: "Email",
  },
  {
    href: "https://www.linkedin.com/in/bruno-esteve-castellano/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/brunoestevecaste",
    label: "GitHub",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-container mt-auto" id="contact">
      <div className="editorial-grid items-end border-t border-line pt-8 pb-8 md:pt-12 md:pb-10">
        <div className="col-span-4 md:col-span-12">
          <h2 className="font-display text-[clamp(3.75rem,13vw,11.5rem)] leading-[1.05] font-normal tracking-[-0.08em]">
            Hablemos.
          </h2>
        </div>
        <p className="col-span-4 mt-4 text-sm text-muted md:col-span-6 md:self-center">
          Bruno Esteve Castellano
        </p>
        <nav
          aria-label="Contacto y perfiles"
          className="col-span-4 mt-2 md:col-span-6 md:mt-4"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-base md:justify-end text-sm md:gap-x-12">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="text-link inline-flex min-h-11 min-w-11 items-center"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
