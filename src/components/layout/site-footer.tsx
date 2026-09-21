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
      <div className="editorial-grid items-end border-t border-line py-8 md:py-12">
        <div className="col-span-4 md:col-span-6">
          <h2 className="heading-text">Hablemos.</h2>
          <p className="mt-5 text-sm">Bruno Esteve Castellano</p>
        </div>
        <nav
          aria-label="Contacto y perfiles"
          className="col-span-4 mt-8 md:col-span-4 md:col-start-9 md:mt-0"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:justify-end">
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
