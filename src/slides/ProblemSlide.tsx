import { useState } from 'react';
import { motion } from 'motion/react';
import HlsVideo from '../components/HlsVideo';
import ServiceModal, {
  type ServiceProject,
} from '../components/ServiceModal';

const RENOVATION_PROJECTS: ServiceProject[] = [
  {
    title: 'Rénovation salle de bain complète',
    before: '/media/renovation/sdb-avant.webp',
    after: '/media/renovation/sdb-apres.webp',
  },
  {
    title: 'Pose douche & baignoire',
    before: '/media/renovation/douche-avant.webp',
    after: '/media/renovation/douche-apres.webp',
  },
  {
    title: 'Installation robinetterie',
    before: '/media/renovation/robinetterie-avant.webp',
    after: '/media/renovation/robinetterie-apres.webp',
  },
  {
    title: 'Réseaux sanitaires neufs',
    before: '/media/renovation/reseaux-avant.webp',
    after: '/media/renovation/reseaux-apres.webp',
  },
];

const DEPANNAGE_PROJECTS: ServiceProject[] = [
  {
    title: "Réparation fuite d'eau",
    before: '/media/depannage/fuite-avant.webp',
    after: '/media/depannage/fuite-apres.webp',
  },
  {
    title: 'Débouchage canalisations',
    before: '/media/depannage/debouchage-avant.webp',
    after: '/media/depannage/debouchage-apres.webp',
  },
  {
    title: 'Remplacement WC & lavabo',
    before: '/media/depannage/wc-avant.webp',
    after: '/media/depannage/wc-apres.webp',
  },
];

const VIDEO_SRC =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

const CHAUFFAGISTE_PROJECTS: ServiceProject[] = [
  {
    title: 'Installation chauffe-eau',
    before: '/media/chauffagiste/chauffe-eau-avant.webp',
    after: '/media/chauffagiste/chauffe-eau-apres.webp',
  },
  {
    title: 'Ballon thermodynamique',
    before: '/media/chauffagiste/ballon-avant.webp',
    after: '/media/chauffagiste/ballon-apres.webp',
  },
  {
    title: 'Pose & entretien radiateurs',
    before: '/media/chauffagiste/radiateur-avant.webp',
    after: '/media/chauffagiste/radiateur-apres.webp',
  },
  {
    title: 'Dépannage chauffage',
    before: '/media/chauffagiste/chaudiere-avant.webp',
    after: '/media/chauffagiste/chaudiere-apres.webp',
  },
];

const cards = [
  {
    icon: 'home',
    title: 'Rénovation',
    desc: 'Transformez votre salle de bain et vos installations sanitaires avec notre expertise.',
    items: [
      'Rénovation salle de bain complète',
      'Pose douche & baignoire',
      'Installation robinetterie',
      'Réseaux sanitaires neufs',
    ],
    href: '#renovation',
    modalId: 'renovation',
  },
  {
    icon: 'build',
    title: 'Dépannage',
    desc: 'Intervention rapide 7j/7 pour toutes vos urgences plomberie à Brest et environs.',
    items: [
      "Réparation fuite d'eau",
      'Débouchage canalisations',
      'Remplacement WC & lavabo',
      'Intervention urgente 7j/7',
    ],
    href: '#depannage',
    modalId: 'depannage',
  },
  {
    icon: 'mode_heat',
    title: 'Chauffagiste',
    desc: 'Installation et entretien de vos équipements de chauffage et eau chaude sanitaire.',
    items: [
      'Installation chauffe-eau',
      'Ballon thermodynamique',
      'Pose & entretien radiateurs',
      'Dépannage chauffage',
    ],
    href: '#chauffagiste',
    modalId: 'chauffagiste',
  },
];

export default function ProblemSlide() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen overflow-hidden bg-black shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      <HlsVideo
        src={VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-black/60" />

      <div className="relative z-10 flex min-h-screen px-10 py-12 pb-20 lg:px-20">
        <div className="my-auto flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-20">
          {/* Left column */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-body mb-6 block text-[10px] uppercase tracking-[0.3em] text-white/30"
            >
              Notre expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="font-heading mb-8 text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Un savoir-faire complet, du{' '}
              <span className="text-sky-400">dépannage d'urgence</span> à la
              rénovation de votre installation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="font-body max-w-xl text-sm font-light leading-relaxed text-white/40 md:text-base"
            >
              Plomberie, chauffage, sanitaire : chaque intervention est menée
              avec rigueur et transparence. Diagnostic clair, devis détaillé
              et travail soigné — pour des installations fiables qui durent.
            </motion.p>
          </div>

          {/* Right column — liquid-glass category cards (clickable) */}
          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[420px]">
            {cards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                onClick={(e) => {
                  if (card.modalId) {
                    e.preventDefault();
                    setOpenModal(card.modalId);
                  }
                }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.12,
                  ease: 'easeOut',
                }}
                className="liquid-glass group block cursor-pointer rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-7"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5">
                    <span className="material-symbols-rounded text-xl text-white/80">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="font-body text-base font-semibold text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="font-body pl-[52px] text-sm font-light leading-relaxed text-white/40">
                  {card.desc}
                </p>
                <ul className="font-body mt-4 pl-[52px]">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 border-b border-white/10 py-2 text-sm font-light text-white/70 last:border-b-0"
                    >
                      <span className="material-symbols-rounded shrink-0 text-base text-sky-400/90">
                        check
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="font-body mt-4 flex items-center gap-1.5 pl-[52px] text-xs font-medium uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:text-sky-300">
                  En savoir plus
                  <span className="material-symbols-rounded text-sm transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <ServiceModal
        open={openModal === 'renovation'}
        onClose={() => setOpenModal(null)}
        label="Rénovation"
        projects={RENOVATION_PROJECTS}
      />
      <ServiceModal
        open={openModal === 'depannage'}
        onClose={() => setOpenModal(null)}
        label="Dépannage"
        projects={DEPANNAGE_PROJECTS}
      />
      <ServiceModal
        open={openModal === 'chauffagiste'}
        onClose={() => setOpenModal(null)}
        label="Chauffagiste"
        projects={CHAUFFAGISTE_PROJECTS}
      />
    </section>
  );
}
