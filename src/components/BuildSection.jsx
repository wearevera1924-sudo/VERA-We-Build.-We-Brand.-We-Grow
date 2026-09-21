// ================================ 
// VERA SIGNATURE EFFECT 
// Browser → Fullscreen Transition 
// A realistic browser window grows with scroll until it becomes the 
// whole viewport — "you are entering the website". 
// Desktop: laptop-ish browser scales to near-fullscreen (radius shrinks). 
// Tablet/mobile: simplified — browser scales within the screen. 
// Remove the <BrowserFullscreen /> block to disable (section keeps its intro). 
// ================================ 
import { useEffect, useRef, useState } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion'; 
 
function BrowserFullscreen() { 
  const ref = useRef(null); 
  const [small, setSmall] = useState(false); 
 
  useEffect(() => { 
    const mq = window.matchMedia('(max-width: 760px)'); 
    const update = () => setSmall(mq.matches); 
    update(); 
    mq.addEventListener('change', update); 
    return () => mq.removeEventListener('change', update); 
  }, []); 
 
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] }); 
 
  const width = useTransform(scrollYProgress, [0, 0.55], small ? ['80vw', '95vw'] : ['46vw', '93vw']); 
  const radius = useTransform(scrollYProgress, [0, 0.6], small ? [18, 12] : [22, 0]); 
  const shadow = useTransform( 
    scrollYProgress, 
    [0, 0.6], 
    ['0 34px 90px -28px rgba(20,20,20,0.38)', '0 0 0 rgba(20,20,20,0)'] 
  ); 
  const cap1 = useTransform(scrollYProgress, [0, 0.22, 0.4], [1, 0.85, 0]); 
  const cap2 = useTransform(scrollYProgress, [0.42, 0.6, 0.98], [0, 1, 1]); 
 
  return ( 
    <div className="bfs" ref={ref}> 
      <div className="bfs-sticky"> 
        <motion.p className="bfs-caption" style={{ opacity: cap1 }}> 
          Scroll to enter the experience <span className="bounce">↓</span> 
        </motion.p> 
        <motion.p className="bfs-caption" style={{ opacity: cap2 }}> 
          You're in — this is how we build <span className="bounce">•</span> 
        </motion.p> 
 
        <motion.div 
          className="device-browser bfs-browser" 
          style={{ width, borderRadius: radius, boxShadow: shadow }} 
        > 
          <div className="db-chrome"> 
            <div className="db-dots" aria-hidden="true"><span /><span /><span /></div> 
            <div className="db-addr"><b>vera.studio</b>&nbsp;/crafted-with-vera</div> 
          </div> 
          <div className="db-screen"> 
            <img src="/assets/project-1.jpg" alt="VERA website experience shown fullscreen" loading="lazy" /> 
          </div> 
        </motion.div> 
      </div> 
    </div> 
  ); 
} 
 
// ================================ 
// VERA BUILD SECTION — chapter 01 
// ================================ 
const CHIPS = ['Websites', 'Apps', 'Interfaces', 'E-Commerce', 'Performance', 'SEO']; 
 
export default function BuildSection() { 
  return ( 
    <section className="build" id="build"> 
      <div className="container"> 
        <div className="build-intro"> 
          <div> 
            <p className="section-label"><b>01</b> Build</p> 
            <h2 className="serif-big" style={{ marginTop: 'clamp(10px,1.4vw,18px)' }}> 
              We build the <em className="serif-it">digital objects</em> your business runs on. 
            </h2> 
          </div> 
          <div className="build-chips"> 
            {CHIPS.map((c) => <span key={c}>{c}</span>)} 
          </div> 
        </div> 
      </div> 
      <BrowserFullscreen /> 
    </section> 
  ); 
} 