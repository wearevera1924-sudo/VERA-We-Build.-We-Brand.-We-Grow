// ================================
// VERA TESTIMONIALS
// Realistic temporary demo testimonials, easy to replace -
// edit src/data/testimonials.js (set avatar to an image path or keep null).
// ================================
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimonials from '../data/testimonials.js';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = testimonials.length;

  const go = useCallback((d) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  }, [total]);

  useEffect(() => {
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [go]);

  const t = testimonials[index];
  const initials = t.name.split(' ').map((p) => p[0]).join('').slice(0, 2);

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <p className="section-label" style={{ justifyContent: 'center' }}>Client voices </p>

        <div className="tst" style={{ marginTop: 'clamp(24px,3.4vw,44px)' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              className="tst-quote"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              &#8220;{t.quote}&#8221;
            </motion.blockquote>
          </AnimatePresence>

          <div className="tst-meta">
            <div className="tst-avatar">
              {t.avatar ? (
                <img src={t.avatar} alt={`${t.name} avatar`} loading="lazy" />
              ) : (
                initials
              )}
            </div>
            <div className="tst-who">
              <b>{t.name}</b>
              <span>{t.role} &middot; {t.company}</span>
            </div>
          </div>

          <div className="tst-controls">
            <button className="tst-btn" onClick={() => go(-1)} aria-label="Previous testimonial">&#8592;</button>
            <div className="tst-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? 'on' : ''}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="tst-btn" onClick={() => go(1)} aria-label="Next testimonial">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
