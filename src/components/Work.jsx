// ================================
// VERA WORK - chapter 03: GROW
// Premium portfolio: alternating editorial rows, hover-scaling visuals,
// parallax, magnetic images and the Cursor Image Reveal preview.
// Projects and their URLs live centrally in src/data/projects.js.
//
// SAFETY: rows are plain JSX (not wrapped in whileInView with opacity:0
// baseline), so every project reads correctly even if Motion viewport
// observers fail to attach.
// ================================
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projects from '../data/projects.js';
import Marquee from './Marquee.jsx';
import MagneticImage from './MagneticImage.jsx';
import { CursorImageRevealTrigger } from './CursorImageReveal.jsx';

const CATEGORIES = ['Websites', 'Apps', 'Branding', 'Graphic Design', 'Social Media', 'Content'];
const GROW_MARQUEE = ['WE GROW', 'Campaigns', 'Social media', 'Audiences', 'Momentum', 'Marketing'];

function WorkRow({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <article className="work-row" ref={ref}>
      <div className="work-row-inner">
        <div className="work-meta">
          <p className="work-index"><b>0{index + 1}</b> / 06</p>
          <CursorImageRevealTrigger image={project.image} className="work-reveal-zone">
            <h3>{project.title}</h3>
          </CursorImageRevealTrigger>
          <span className="work-cat">{project.category}</span>
          <p className="work-desc">{project.description}</p>
         {/* <a className="work-link" href={project.url} target="_blank" rel="noreferrer">
            VIEW PROJECT <span className="arr">&#8599;</span>
          </a>*/}
        </div>

        <div>
          {/* VERA INTERACTION: Magnetic Image + Cursor reveal on visual */}
          <MagneticImage strength={0.12} max={12} className="work-img-zone">
            <CursorImageRevealTrigger image={project.image} className="work-reveal-zone">
              <motion.div className="work-img" style={{ y: imgY }} whileHover="hover">
                <motion.img
                  src={project.image}
                  alt={`${project.title} - ${project.category} project by VERA`}
                  loading="lazy"
                  variants={{ hover: { scale: 1.055 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="work-img-cat">{project.category}</span>
              </motion.div>
            </CursorImageRevealTrigger>
          </MagneticImage>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section className="section grow" id="work">
      <div className="container">
        <div className="work-head">
          <div>
            <p className="section-label"><b></b> Grow - selected work</p>
            <h2 className="display-huge" style={{ marginTop: 'clamp(10px,1.4vw,18px)' }}>
              We <em className="serif-it" style={{ textTransform: 'none' }}>grow</em> with our clients.
            </h2>
          </div>
          <div className="work-cats">
            {CATEGORIES.map((c) => <span key={c}>{c}</span>)}
          </div>
        </div>
      </div>

      <Marquee items={GROW_MARQUEE} className="grow-marquee" />

      <div className="container" style={{ marginTop: 'clamp(40px,6vw,80px)' }}>
        <div className="work-list">
          {projects.map((p, i) => <WorkRow key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
