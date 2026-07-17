import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

const PHONE_DISPLAY = '06 02 22 29 22';
const PHONE_TEL = '+33602222922';
const MAPS_DIR_URL =
  'https://www.google.com/maps/dir/?api=1&destination=AS+29+Plomberie%2C+19+Rue+du+Mar%C3%A9chal+Val%C3%A9e%2C+29200+Brest';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'Dépannage urgent 7j/7',
  'Réparation fuite d\'eau',
  'Rénovation salle de bain',
  'Chauffage & chaudières',
  'Installation chauffe-eau',
  'Débouchage canalisations',
];

export default function Footer() {
  return (
    <footer className="font-body relative z-50 border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-10">
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#" aria-label="Revenir en haut de la page">
              <img
                src="/media/logo.png"
                alt="AS 29 Plomberie — Plombier chauffagiste à Brest"
                className="h-16 w-auto transition-opacity hover:opacity-80"
              />
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Plombier chauffagiste à Brest. Dépannage, rénovation et
              chauffage — un artisan local, joignable jour et nuit.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <strong className="text-white">5,0</strong> · Avis Google
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Pied de page">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navigation
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Nos services
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contact
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-sky-400" />
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  19 rue du Maréchal Valée
                  <br />
                  29200 Brest
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-sky-400" />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-semibold text-white transition-colors hover:text-sky-300"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="shrink-0 text-sky-400" />
                Ouvert 24h/24 — 7j/7
              </li>
              <li>
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 transition-colors hover:text-sky-300"
                >
                  <Navigation size={13} />
                  Itinéraire vers l'atelier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal blocks */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40">
          <details className="group">
            <summary className="cursor-pointer list-none font-medium text-white/60 transition-colors hover:text-white">
              Mentions légales{' '}
              <span className="text-white/30 group-open:hidden">— afficher</span>
            </summary>
            <div className="mt-3 max-w-3xl leading-relaxed">
              <p>
                <strong className="text-white/60">Éditeur du site :</strong>{' '}
                AS 29 Plomberie — 19 rue du Maréchal Valée, 29200 Brest —
                Tél. : 06 02 22 29 22. Forme juridique, capital et numéro
                SIRET : [à compléter par l'entreprise].
              </p>
              <p className="mt-2">
                <strong className="text-white/60">
                  Directeur de la publication :
                </strong>{' '}
                AS 29 Plomberie.
              </p>
              <p className="mt-2">
                <strong className="text-white/60">Hébergement :</strong>{' '}
                Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                États-Unis — vercel.com.
              </p>
              <p className="mt-2">
                <strong className="text-white/60">Crédits :</strong> contenus
                visuels © AS 29 Plomberie. Toute reproduction est interdite
                sans autorisation préalable.
              </p>
            </div>
          </details>

          <details className="group">
            <summary className="cursor-pointer list-none font-medium text-white/60 transition-colors hover:text-white">
              Politique de confidentialité{' '}
              <span className="text-white/30 group-open:hidden">— afficher</span>
            </summary>
            <div className="mt-3 max-w-3xl leading-relaxed">
              <p>
                Les informations saisies dans le formulaire de contact (nom,
                téléphone, description du besoin) servent uniquement à vous
                recontacter au sujet de votre demande. Elles ne sont pas
                stockées sur un serveur, ne sont jamais transmises à des
                tiers et ne font l'objet d'aucune exploitation commerciale.
              </p>
              <p className="mt-2">
                Conformément au RGPD, vous disposez d'un droit d'accès, de
                rectification et de suppression de vos données : il suffit de
                nous contacter au 06 02 22 29 22.
              </p>
              <p className="mt-2">
                Ce site n'utilise aucun cookie de suivi ni outil de mesure
                d'audience tiers.
              </p>
            </div>
          </details>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AS 29 Plomberie — Tous droits
            réservés.
          </p>
          <p>
            Plombier chauffagiste à Brest et sa périphérie — intervention
            24h/24, 7j/7.
          </p>
        </div>
      </div>
    </footer>
  );
}
