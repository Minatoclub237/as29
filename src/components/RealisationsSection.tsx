import { motion } from 'motion/react';

const IMAGES = [
  '/media/realisations/realisation-1.webp',
  '/media/realisations/realisation-2.webp',
  '/media/realisations/realisation-3.webp',
  '/media/realisations/realisation-4.webp',
];

export default function RealisationsSection() {
  return (
    <section
      id="realisations"
      className="relative min-h-screen overflow-hidden bg-white shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.5)]"
    >
      <div className="flex min-h-screen flex-col justify-center py-20">
        {/* Header */}
        <div className="px-6 text-center lg:px-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-body mb-5 block text-[10px] uppercase tracking-[0.3em] text-neutral-400"
          >
            Nos réalisations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-heading text-4xl italic leading-[0.95] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
          >
            <span className="text-sky-600">Des chantiers</span> qui parlent
            d'eux-mêmes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="font-body mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-neutral-500 md:text-base"
          >
            Survolez une photo pour la découvrir en pleine couleur — chaque
            chantier est livré propre, fini, et prêt à vivre.
          </motion.p>
        </div>

        {/* Marquee — flows right to left, pauses on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-14 overflow-hidden"
        >
          <div className="marquee-track flex w-max gap-6 pr-6">
            {[...IMAGES, ...IMAGES].map((src, i) => (
              <div
                key={i}
                className="group relative h-[260px] w-[85vw] shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:w-[420px] md:h-[320px]"
              >
                <img
                  src={src}
                  alt={`Réalisation ${(i % IMAGES.length) + 1}`}
                  draggable={false}
                  className="h-full w-full object-cover blur-[3px] grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-0 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="font-body mt-14 flex flex-wrap items-center justify-center gap-4 px-6"
        >
          <a
            href="#contact"
            className="rounded-full bg-neutral-900 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-neutral-700 sm:text-sm"
          >
            Demander un devis gratuit
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900/5 sm:text-sm"
          >
            📞 Urgence 7j/7
          </a>
        </motion.div>
      </div>
    </section>
  );
}
