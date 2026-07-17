import Reveal from './Reveal';

const stats = [
  { value: '150', unit: '+', label: 'Projets réalisés' },
  { value: '10', unit: '', label: "Ans d'expérience" },
  { value: '100', unit: '%', label: 'Clients satisfaits' },
];

export default function SectionOne() {
  return (
    <section className="flex min-h-screen flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-12 md:px-12 md:pb-16">
      <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-2">
        <h1
          className="flex flex-col font-medium leading-[1.05] tracking-tight drop-shadow-lg"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          <Reveal as="span" delay={100}>
            Proximité.
          </Reveal>
          <Reveal as="span" delay={250}>
            Réactivité.
          </Reveal>
          <Reveal as="span" delay={400} className="text-sky-400">
            Qualité.
          </Reveal>
          <Reveal as="span" delay={550}>
            Confiance.
          </Reveal>
        </h1>
        <Reveal delay={700}>
          <div className="flex flex-wrap gap-8 sm:justify-end sm:gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
