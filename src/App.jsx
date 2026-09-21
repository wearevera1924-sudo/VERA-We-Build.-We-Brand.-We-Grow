// ================================
// VERA - APP COMPOSITION
// One continuous journey: BUILD -> BRAND -> GROW -> Contact.
// Signature effects are mounted here so each can be removed independently.
// ErrorBoundary wraps everything so a future throw shows a useful error
// instead of a silent white screen.
// ================================
import ErrorBoundary from './lib/ErrorBoundary.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import BuildSection from './components/BuildSection.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// SIGNATURE 04 - Liquid Text
import LiquidText from './components/LiquidText.jsx';

// Cursor system - each effect is a separate component.
import CustomCursor from './components/CustomCursor.jsx';
import CursorSpotlight from './components/CursorSpotlight.jsx'; // SIGNATURE 05
import { CursorImageRevealProvider } from './components/CursorImageReveal.jsx'; // SIGNATURE 01
import FAQ from './components/FAQ.jsx';

function LiquidBand({ caption, words }) {
  return (
    <section className="liquid-band">
      <div className="ambient ambient--royal" style={{ width: '34vw', height: '34vw', top: '-10%', left: '8%' }} />
      <div className="ambient ambient--amber" style={{ width: '26vw', height: '26vw', bottom: '-14%', right: '6%' }} />
      <p className="liquid-caption">{caption}</p>
      <LiquidText words={words} interval={3400} huge />
    </section>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CursorImageRevealProvider>
        <div className="page-wrap">
          {/* SIGNATURE 05 - royal spotlight (desktop only, self-guarded) */}
          <CursorSpotlight />

          {/* Custom cursor (desktop only, self-guarded) */}
          <CustomCursor />

          <Navbar />

          <main>
            <Hero />
            {/*<BuildSection />*/}

           {/* BUILD melts into BRAND */}
           {/*  <LiquidBand caption="Chapter transition - build -> brand" words={['BUILD', 'BRAND']} /> */}

            <About />
            <Services />

            {/* BRAND melts into GROW */}
            <LiquidBand caption="" words={['BUILD ', 'SCALE']} />

            <Work />
            {/* <Process /> */}
            <FAQ />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </div>
      </CursorImageRevealProvider>
    </ErrorBoundary>
  );
}
