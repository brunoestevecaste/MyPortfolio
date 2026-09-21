import Link from "next/link";

const navigation = [
  { href: "/#work", label: "Proyectos" },
  { href: "/#about", label: "Perfil" },
  { href: "/#contact", label: "Contacto" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-container" data-site-header>
      <div className="flex min-h-18 flex-wrap items-center justify-between gap-x-6 py-3 md:py-0">
        <Link
          className="inline-flex min-h-11 items-center text-xs font-normal tracking-[-0.025em] uppercase hover:text-signal"
          href="/"
        >
          Bruno Esteve Castellano
        </Link>

        <nav
          aria-label="Navegación principal"
          className="w-full md:w-auto"
        >
          <ul className="flex items-center justify-between gap-5 text-xs uppercase md:justify-end md:gap-10 md:text-xs">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-signal hover:underline hover:underline-offset-4"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
