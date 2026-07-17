import { useRef } from 'react';
import DroneVideo from './DroneVideo';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';

export default function AetherSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a]">
      {/* Sticky viewport: the drone video pins here and scrubs across the chapter */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <DroneVideo sectionRef={sectionRef} />
      </div>
      {/* Content rides over the pinned video */}
      <main className="relative z-10 -mt-[100vh]">
        <SectionOne />
        <div className="h-[80vh]" aria-hidden="true" />
        <SectionTwo />
        {/* Held shot: video stays pinned while the next section slides over it */}
        <div className="h-[100vh]" aria-hidden="true" />
      </main>
    </section>
  );
}
