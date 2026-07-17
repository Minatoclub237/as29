import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { FadeUp } from './FadeUp';
import { SpotlightBorder, spotlightMaskStyle } from './SpotlightBorder';
import { MIcon } from './MIcon';

type CategoryKey = 'tarifs' | 'urgences' | 'garanties';

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'tarifs', label: 'Tarifs & Devis' },
  { key: 'urgences', label: 'Urgences & Délais' },
  { key: 'garanties', label: 'Garanties & Sérieux' },
];

const faqs: Record<CategoryKey, { q: string; a: string }[]> = {
  tarifs: [
    {
      q: "Les plombiers doublent les prix dès qu'il y a de l'eau par terre. Pourquoi vous croire ?",
      a: "Parce que le prix est annoncé avant d'intervenir, pas après. Vous recevez un devis clair ou une fourchette ferme dès le premier appel, et rien ne démarre sans votre accord. Pas de majoration surprise — même en urgence.",
    },
    {
      q: "Le « devis gratuit », c'est l'appât classique. Où est le piège ?",
      a: "Nulle part : le devis est détaillé ligne par ligne — pièces, main-d'œuvre, déplacement — et sans engagement. Vous pouvez le comparer, le refuser, ou même le faire exécuter par un autre artisan. Il reste gratuit.",
    },
    {
      q: 'Je trouve deux fois moins cher sur Leboncoin.',
      a: "C'est vrai. Mais sans assurance décennale, sans facture, et sans recours si ça tourne mal. Une fuite mal réparée coûte dix fois le prix d'une intervention propre. Nous, on assume et on assure chaque chantier.",
    },
    {
      q: "Comment je sais que vous n'inventez pas des travaux inutiles ?",
      a: "Tout est documenté : photos avant/après, explication du diagnostic, et les pièces remplacées vous sont restituées sur demande. Si une simple réparation suffit, on ne vous vendra jamais un remplacement.",
    },
    {
      q: 'Payer un déplacement même si vous ne réparez rien, c\'est abusé.',
      a: "Le diagnostic a un coût réel — temps, trajet, expertise. Mais il est intégralement déduit de la facture si vous acceptez les travaux. Vous ne payez jamais deux fois la même chose.",
    },
  ],
  urgences: [
    {
      q: "« Urgence 7j/7 », tout le monde l'écrit et personne ne décroche à 23h.",
      a: "Notre ligne d'urgence est une vraie ligne directe, pas un répondeur. Et si nous ne pouvons pas intervenir immédiatement, on vous le dit franchement — avec les gestes qui sauvent en attendant.",
    },
    {
      q: "J'ai une fuite qui inonde. Concrètement, vous arrivez quand ?",
      a: "Sur Brest et sa périphérie, notre délai moyen constaté est de 2h. Et dès le téléphone, on vous guide pour couper l'eau et limiter les dégâts — avant même de prendre la route.",
    },
    {
      q: "Une réparation d'urgence, c'est du provisoire qui lâche dans un mois.",
      a: "Quand une solution provisoire s'impose — pièce à commander, réseau à sécher — elle est annoncée comme telle, et le retour pour la réparation définitive est planifié avant notre départ. Jamais de bricolage déguisé en réparation.",
    },
    {
      q: 'La nuit et les jours fériés, la facture explose, non ?',
      a: "Les conditions d'intervention en horaires majorés sont annoncées au téléphone, chiffres à l'appui, avant le déplacement. Vous décidez en connaissance de cause — pas devant le compteur d'eau.",
    },
    {
      q: 'Et si vous ne trouvez pas la fuite ?',
      a: "La recherche de fuite fait partie du métier : inspection, mise en pression, caméra. Si l'origine dépasse notre périmètre — toiture, façade — on vous oriente vers le bon corps de métier au lieu de facturer des heures inutiles.",
    },
  ],
  garanties: [
    {
      q: 'Ça refuit une semaine après votre passage. Qui paie ?',
      a: "Nous. Toute intervention est garantie : si le problème réapparaît, on revient sans frais de déplacement ni de main-d'œuvre. Et c'est écrit sur la facture.",
    },
    {
      q: 'Un dégât des eaux pendant vos travaux, et je me retrouve seul face à mon assurance.',
      a: "Non : nous sommes couverts en responsabilité civile professionnelle et en garantie décennale. En cas d'incident, notre assurance prend le relais — vous n'êtes jamais seul dans la boucle.",
    },
    {
      q: 'Les artisans disparaissent une fois le chantier encaissé.',
      a: "Une entreprise identifiée à Brest, des factures conformes, et un suivi après chantier : nous répondons après l'encaissement comme avant le devis. C'est exactement ce qui fait revenir nos clients.",
    },
    {
      q: 'Vous posez du matériel premier prix pour marger plus ?',
      a: "Le matériel proposé est de marque reconnue, choisi avec vous, fiche produit à l'appui. Vous préférez fournir le vôtre ? On le pose — en vous disant honnêtement ce qu'on en pense.",
    },
    {
      q: "Pourquoi un artisan local plutôt qu'une grosse enseigne de dépannage ?",
      a: "Parce que vous parlez toujours à la même personne : celle qui fait le devis, le chantier et le SAV. Pas de sous-traitance en cascade, pas de call-center — et une réputation locale à défendre.",
    },
  ],
};

export default function FaqSection() {
  const [active, setActive] = useState<CategoryKey>('tarifs');
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Per-card spotlight: each accordion item tracks the cursor independently.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="faq"
      className="font-inter relative z-40 w-full bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeUp delay={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-landing-surface px-3 py-1 text-xs text-foreground/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                FAQ
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-5 text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl">
                Les questions qui fâchent,
                <br className="hidden sm:block" />{' '}
                <span className="text-sky-400">nos réponses sans détour.</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm text-foreground/60 sm:text-base">
              Pas de FAQ marketing : voici les vraies objections qu'on entend
              sur les plombiers — et ce que nous y répondons, concrètement.
            </p>
          </FadeUp>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Left: categories + contact card */}
          <div className="flex flex-col gap-4 lg:h-full">
            <div className="lg:flex-1">
              <SpotlightBorder
                radius="2xl"
                size={280}
                className="flex flex-col gap-1 p-2 sm:p-3 lg:sticky lg:top-24"
              >
                {categories.map((c) => (
                  <SpotlightBorder
                    key={c.key}
                    as="button"
                    radius="full"
                    size={200}
                    intensity={0.4}
                    onClick={() => setActive(c.key)}
                    className={
                      active === c.key
                        ? 'w-full border border-white/10 bg-landing-surface px-5 py-3 text-center text-sm text-foreground transition-colors'
                        : 'w-full border border-transparent px-5 py-3 text-center text-sm text-foreground/60 transition-colors hover:text-foreground'
                    }
                  >
                    {c.label}
                  </SpotlightBorder>
                ))}
              </SpotlightBorder>
            </div>

            {/* Contact card + CTAs */}
            <SpotlightBorder
              radius="2xl"
              size={360}
              className="mt-8 p-2 sm:p-3 lg:mt-0"
            >
              <SpotlightBorder
                radius="2xl"
                size={260}
                intensity={0.4}
                className="border border-white/10 bg-landing-surface p-6"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  Une question directe ?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  Une situation particulière, un doute sur un devis reçu
                  ailleurs ? Posez-nous la question — réponse franche,
                  sans jargon.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-white/90"
                  >
                    Demander un devis gratuit
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors duration-300 hover:border-white hover:bg-white/10"
                  >
                    📞 Urgence 7j/7
                  </a>
                </div>
              </SpotlightBorder>
            </SpotlightBorder>
          </div>

          {/* Right: accordion */}
          <SpotlightBorder radius="2xl" size={360} className="p-2 sm:p-3">
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs[active].map((item, idx) => (
                <FadeUp delay={0.15 * idx} key={`${active}-${idx}`}>
                  <AccordionItem
                    value={`${active}-${idx}`}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    className="relative rounded-2xl border border-white/10 bg-landing-surface px-6 [&[data-state=open]]:bg-landing-surface-hover"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={spotlightMaskStyle(260, 0.4)}
                    />
                    <AccordionTrigger className="py-7 text-left text-sm font-medium text-foreground hover:no-underline sm:text-base [&>svg]:hidden">
                      <span className="flex-1 pr-4">{item.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-foreground/70 transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <MIcon name="expand_more" size={16} />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-7 text-sm leading-relaxed text-foreground/60">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </FadeUp>
              ))}
            </Accordion>
          </SpotlightBorder>
        </div>
      </div>
    </section>
  );
}
