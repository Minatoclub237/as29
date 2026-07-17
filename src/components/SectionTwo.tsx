import Reveal from './Reveal';

const leftStats = [
  { value: '24h/24', label: 'Urgences' },
  { value: '7j/7', label: 'Disponibilité' },
  { value: '2h', label: 'Délai moyen' },
];

const rightStats = [
  { value: 'Devis', label: 'Gratuit', boxed: true },
  { value: '10 ans', label: 'Garantie', boxed: false },
  { value: '30 min', label: 'Diagnostic', boxed: false },
  { value: '100%', label: 'Transparence', boxed: false },
];

export default function SectionTwo() {
  return (
    <section className="flex min-h-screen flex-col justify-between px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16">
      {/* Top-right block */}
      <div className="max-w-sm self-end">
        <Reveal delay={100}>
          <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
            Votre{' '}
            <span className="text-sky-400">Plombier Chauffagiste</span>
            <br />
            de confiance à Brest
          </h2>
        </Reveal>
        <Reveal delay={250} className="mt-8">
          <div className="grid grid-cols-[auto_1fr] gap-6">
            <div>
              <div className="text-2xl font-bold tabular-nums sm:text-3xl">
                99.7%
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                Taux de réussite
              </div>
            </div>
            <p className="text-xs text-white/70 sm:text-sm">
              Des centaines d'interventions menées avec un savoir-faire
              éprouvé, dans le respect des délais et des normes.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Bottom area */}
      <div className="mt-auto grid grid-cols-1 gap-10 pt-16 sm:grid-cols-2 sm:pt-20">
        <Reveal delay={400}>
          <div className="flex flex-wrap gap-8 sm:gap-10">
            {leftStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={550} className="sm:ml-auto">
          <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6">
            {rightStats.map((stat) => (
              <div
                key={stat.label}
                className={
                  stat.boxed
                    ? 'rounded-lg border border-white/30 px-4 py-3'
                    : 'px-4 py-3'
                }
              >
                <div className="text-xl font-bold tabular-nums sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full border border-white/60 px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:border-white hover:bg-white/10 sm:px-6 sm:py-3 sm:text-sm">
              Prendre rendez-vous
            </button>
            <button className="rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:px-6 sm:py-3 sm:text-sm">
              📞 Urgence 7j/7
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
