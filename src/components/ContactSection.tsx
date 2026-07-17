import type { FormEvent } from 'react';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { FadeUp } from './FadeUp';

const PHONE_DISPLAY = '06 02 22 29 22';
const PHONE_TEL = '+33602222922';
const MAPS_DIR_URL =
  'https://www.google.com/maps/dir/?api=1&destination=AS+29+Plomberie%2C+19+Rue+du+Mar%C3%A9chal+Val%C3%A9e%2C+29200+Brest';

export default function ContactSection() {
  // No backend yet: the form opens the user's SMS app with a prefilled
  // message to AS 29 — functional on mobile, harmless on desktop.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = encodeURIComponent(
      `Bonjour AS 29 Plomberie,\nJe suis ${data.get('nom')}.\n${data.get(
        'besoin'
      )}\nMerci de me rappeler au ${data.get('tel')}.`
    );
    window.location.href = `sms:${PHONE_TEL}?&body=${body}`;
  };

  return (
    <section id="contact" className="relative z-50 min-h-screen overflow-hidden bg-white">
      {/* Background video — bright white scene, so this section runs dark-on-light */}
      <video
        src="/media/contact-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-16 lg:px-10">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* Left — business info on light frosted glass */}
          <FadeUp delay={0.1}>
            <div className="liquid-glass rounded-3xl bg-white/5 p-7 backdrop-blur-[2px] sm:p-10">
              <span className="font-body mb-5 block text-[10px] uppercase tracking-[0.3em] text-neutral-700">
                Contact — AS 29 Plomberie
              </span>
              <h2 className="font-heading text-4xl italic leading-[0.95] tracking-tight text-neutral-900 md:text-5xl">
                Une fuite n'attend pas.
                <br />
                Nous non plus.
              </h2>

              {/* Google rating */}
              <div className="font-body mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/40 px-4 py-2 text-sm text-neutral-800">
                <span className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <strong>5,0</strong>
                <span className="text-neutral-700">· Avis Google</span>
              </div>

              <ul className="font-body mt-8 flex flex-col gap-4 text-neutral-800">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-sky-600" />
                  <span>
                    19 rue du Maréchal Valée, 29200 Brest
                    <span className="block text-sm text-neutral-700">
                      Intervention à Brest et toute sa périphérie
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-sky-600" />
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-semibold text-neutral-900 underline-offset-4 hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-sky-600" />
                  <span>
                    Ouvert <strong>24h/24 — 7j/7</strong>
                    <span className="block text-sm text-neutral-700">
                      Nuits, week-ends et jours fériés compris
                    </span>
                  </span>
                </li>
              </ul>

              {/* CTAs — no generic labels */}
              <div className="font-body mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-neutral-700 sm:text-sm"
                >
                  <Phone size={16} />
                  On décroche : {PHONE_DISPLAY}
                </a>
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-900/25 bg-white/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-white sm:text-sm"
                >
                  <Navigation size={16} />
                  Itinéraire vers l'atelier
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Right — compact liquid-glass form */}
          <FadeUp delay={0.25}>
            <form
              onSubmit={onSubmit}
              className="liquid-glass rounded-3xl bg-white/5 p-7 backdrop-blur-[2px] sm:p-8"
            >
              <h3 className="font-body text-xl font-semibold text-neutral-900">
                Décrivez le problème,
                <br />
                on vous rappelle.
              </h3>
              <p className="font-body mt-1.5 text-sm text-neutral-700">
                Réponse sous 2h en journée — immédiate en urgence.
              </p>

              <div className="font-body mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
                  Votre nom
                  <input
                    name="nom"
                    required
                    placeholder="Ex : Marie Le Gall"
                    className="rounded-xl border border-neutral-900/15 bg-white/40 px-4 py-3 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-sky-600"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
                  Votre téléphone
                  <input
                    name="tel"
                    type="tel"
                    required
                    placeholder="Ex : 06 12 34 56 78"
                    className="rounded-xl border border-neutral-900/15 bg-white/40 px-4 py-3 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-sky-600"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
                  Votre problème
                  <textarea
                    name="besoin"
                    required
                    rows={3}
                    placeholder="Ex : fuite sous l'évier de la cuisine, l'eau coule en continu…"
                    className="resize-none rounded-xl border border-neutral-900/15 bg-white/40 px-4 py-3 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-sky-600"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 rounded-full bg-sky-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:bg-sky-500 sm:text-sm"
                >
                  Être rappelé aujourd'hui
                </button>
                <p className="text-center text-xs text-neutral-700">
                  Vos infos servent uniquement à vous rappeler. Jamais de spam.
                </p>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
