import ScrollVideo from './components/ScrollVideo';
import AquaCallouts from './components/AquaCallouts';
import AetherSection from './components/AetherSection';
import ProblemSlide from './slides/ProblemSlide';
import RealisationsSection from './components/RealisationsSection';
import FaqSection from './components/FaqSection';
import CoverPin from './components/CoverPin';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GlobalNav from './components/GlobalNav';

export default function App() {
  return (
    <>
      <GlobalNav />
      {/* Chapter 1 — water droplet, scrubbed over its own 360vh runway */}
      <ScrollVideo scrollLengthVh={260} />
      <AquaCallouts />
      <div className="h-[360vh]" aria-hidden="true" />
      {/* Chapter 2 — AETHER_X drone universe */}
      <AetherSection />
      {/* Chapter 3 — services; pins when read, chapter 4 covers it */}
      <CoverPin className="z-20 -mt-[100vh]">
        <ProblemSlide />
      </CoverPin>
      {/* Chapter 4 — réalisations; pins when read, the FAQ covers it */}
      <CoverPin className="z-30">
        <RealisationsSection />
      </CoverPin>
      {/* Chapter 5 — FAQ; pins when read, contact covers it */}
      <CoverPin className="z-40">
        <FaqSection />
      </CoverPin>
      {/* Chapter 6 — contact AS 29 Plomberie */}
      <ContactSection />
      <Footer />
    </>
  );
}
