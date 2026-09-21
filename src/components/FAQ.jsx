// ================================
// VERA FAQ — FREQUENTLY ASKED QUESTIONS
// Same visual language as Process.jsx (section-label, serif-big, motion reveals)
// ================================
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FAQS = [
  {
    q: 'What exactly does VERA do?',
    a: 'We take an idea a product,a brand,a business and shape it, build it and help it grow. Strategy, design, code and marketing, under one roof.'
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines depend on the scope of the project. Once we understand your requirements in the first call, we’ll share a clear, realistic timeline tailored to your project.'
  },
  {
    q: 'Do we work with early-stage founders?',
    a: 'Yes a lot of our best work has come from a feeling someone couldn\u2019t shake yet. We help shape the idea before we build it.'
  },
  {
    q: 'What happens after launch?',
    a: 'We don\u2019t disappear. Marketing, content and momentum are part of the process, so the thing you built keeps growing after it goes live.'
  },
  {
    q: 'How do we start?',
    a: 'Reach out with what you\u2019re building or just the feeling behind it. We\u2019ll set up a call and take it from there.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Questions, answered
        </motion.p>
        <h2 className="serif-big" style={{ marginTop: 'clamp(10px,1.4vw,18px)', maxWidth: '16ch' }}>
          Things people <em className="serif-it">ask</em> before we start.
        </h2>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                className="faq-item"
                key={item.q}
                initial={{ opacity: 0, x: -26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faq-icon"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
