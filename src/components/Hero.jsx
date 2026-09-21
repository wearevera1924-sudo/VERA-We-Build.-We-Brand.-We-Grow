// ================================
// VERA HERO SECTION
// Cinematic composition: three differently-treated taglines,
// realistic laptop + phone mockups, floating UI chips, ambient light,
// parallax and magnetic visuals. No fake statistics.
//
// SAFETY: hero copy is rendered as plain HTML and uses small motion
// offsets only - so the page reads correctly even if any module hiccups.
// ================================
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeviceBrowser, DevicePhone } from './DeviceMockups.jsx';
import MagneticImage from './MagneticImage.jsx';
import { CONTACT_LINKS } from '../data/contact.js';
import { FadeUp } from '../styles/safer-motion.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ambY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section className="hero" ref={ref} id="top">
      {/* Royal + amber studio atmosphere */}
      <motion.div className="ambient ambient--royal" style={{ width: '52vw', height: '52vw', top: '-14vw', left: '-16vw', y: ambY }} />
      <div className="ambient ambient--amber" style={{ width: '36vw', height: '36vw', bottom: '-9vw', right: '-12vw' }} />
      <div className="ambient ambient--violet" style={{ width: '28vw', height: '28vw', top: '40%', right: '4%' }} />

      <div className="container">
        <div className="hero-grid">
          {/* Copy side - plain JSX, only gentle fade-up on top */}
          <div className="hero-copy">
            <FadeUp delay={0.05}>
              <p className="hero-kicker">Digital &amp; Creative Studio</p>
            </FadeUp>

            <h1 className="hero-lines">
              <FadeUp delay={0.10} as="span" className="hero-line hl-build">WE&nbsp;BUILD.</FadeUp>
              <FadeUp delay={0.18} as="span" className="hero-line hl-brand">WE&nbsp;BRAND.</FadeUp>
              <FadeUp delay={0.26} as="span" className="hero-line hl-grow grad-text">WE&nbsp;GROW.</FadeUp>
            </h1>

            <FadeUp delay={0.34}>
              <p className="hero-sub">
                VERA is a digital &amp; creative partner for local businesses, startups and personal brands turning ideas into memorable websites, brands and growth.
              </p>
            </FadeUp>

            <FadeUp delay={0.42} className="hero-ctas">
              <a className="btn btn-royal" href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer">
                START A PROJECT <span className="u-grow-arrow">&#8599;</span>
              </a>
              <a className="btn btn-ghost" href="#build">
                EXPLORE VERA <span className="u-grow-arrow">&#8595;</span>
              </a>
            </FadeUp>
          </div>

          {/* Visual side */}
          <div className="hero-visual">
            <FadeUp delay={0.5} className="hero-stage" as="div">
             {/* <p className="hero-float-tag hero-float-tag--a">craft in code &amp; color</p>*/}

              <motion.div className="hero-laptop" style={{ y: laptopY }}>
                {/* VERA INTERACTION: Magnetic Image - remove this wrapper to disable */}
                <MagneticImage strength={0.16} max={10}>
                  <DeviceBrowser
                    src="/assets/cafe2.png"
                    url="the.vera.co"
                    label="digital-experiences"
                    alt="Website project crafted by VERA, shown inside a browser window"
                  />
                </MagneticImage>
              </motion.div>

             <motion.div className="hero-phone" style={{ y:  phoneY }}>
                <DevicePhone
                  src="/assets/veraphone.jpeg"
                  alt="Mobile app interface designed by VERA, inside a phone frame"
                />
              </motion.div>

{/*<div className="chip-card chip-1"><span className="chip-dot" />Website + App</div>*/}
              <div className="chip-card chip-2"><span className="chip-dot" />Brand Identity</div>
              <div className="chip-card chip-3"><span className="chip-dot chip-dot--amber" />Campaigns</div>
              <div className="chip-card chip-4"><span className="chip-dot" />Content</div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
