import { useState } from 'react';

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function GlobalNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mix-blend-difference keeps the white nav readable over the white
          chapters (réalisations, contact) by auto-inverting. */}
      <nav className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between bg-transparent px-8 py-6 mix-blend-difference md:px-12">
        {/* Logo */}
        <a href="/" aria-label="AS 29 Plomberie — accueil">
          <img
            src="/media/logo.png"
            alt="AS 29 Plomberie — Plombier chauffagiste à Brest"
            className="h-10 w-auto sm:h-11"
          />
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body rounded-sm px-4 py-2 text-sm font-light text-white transition-colors hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA placeholder — keeps nav spacing; the real (blue) CTA lives
            outside the mix-blend-difference layer so its color stays true */}
        <span
          aria-hidden
          className="font-body pointer-events-none hidden select-none rounded-[2px] px-6 py-2.5 text-sm font-medium opacity-0 md:inline-block"
        >
          Devis gratuit
        </span>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Real CTA — outside the blended nav, constant blue everywhere */}
      <a
        href="#contact"
        className="font-body fixed right-8 top-6 z-[81] hidden rounded-[2px] bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400 md:inline-block md:right-12"
      >
        Devis gratuit
      </a>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-0 z-[70] bg-black/95 px-8 pb-10 pt-24 backdrop-blur-md md:hidden">
          <div className="font-body flex flex-col gap-1">
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-4 py-3.5 text-lg font-light text-white transition-colors hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-[2px] bg-sky-500 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-sky-400"
            >
              Devis gratuit
            </a>
          </div>
        </div>
      )}
    </>
  );
}
