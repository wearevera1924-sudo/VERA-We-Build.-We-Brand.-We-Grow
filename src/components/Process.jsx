// ================================
// VERA PROCESS — HOW VERA WORKS
// A visual scroll interaction — no corporate 01-02-03-04-05 list.
// ================================
import { motion } from 'framer-motion';

const STEPS = [
  { n: '01', t: 'YOU BRING THE IDEA.', s: 'A product, a brand, a business — or just a feeling you can\u2019t shake.' },
  { n: '02', t: 'WE SHAPE IT.', s: 'Strategy, direction and a plan that gives the idea form.' },
  { n: '03', t: 'WE CREATE IT.', s: 'Design, code, words and visuals — built as one continuous craft.' },
  { n: '04', t: 'YOU LAUNCH IT.', s: 'Polished, tested and ready to meet the world.' },
  { n: '05', t: 'WE HELP IT GROW.', s: 'Marketing, content and momentum — so it doesn\u2019t just launch, it lives.' }
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How VERA works
        </motion.p>
        <h2 className="serif-big" style={{ marginTop: 'clamp(10px,1.4vw,18px)', maxWidth: '16ch' }}>
          From spark to <em className="serif-it">scale</em> — five movements, one flow.
        </h2>

        <div className="steps">
          {STEPS.map((s, i) => (
            <motion.div
              className="step"
              key={s.n}
              initial={{ opacity: 0, x: -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step-num">{s.n}</span>
              <span className="step-text">
                {s.t}
                <span className="sub">{s.s}</span>
              </span>
              <span className="step-arrow">{i < STEPS.length - 1 ? '→' : '●'}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
