// ================================
// VERA NAVIGATION
// Fixed bar + mobile overlay menu.
// ================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_LINKS } from '../data/contact.js';

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="nav-logo" href="#top" aria-label="VERA — back to top">
            <img src="/vera.png" alt="VERA logo" />
            <b>VERA</b>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a className="btn btn-royal nav-cta" href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer">
            START A PROJECT <span className="u-grow-arrow">↗</span>
          </a>
          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="nav-overlay-logo" href="#top" onClick={() => setOpen(false)}>
              <img src="/veralogo.jpeg" alt="VERA logo" />
              <b>VERA</b>
            </a>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.p
              className="nav-overlay-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              We build. We brand. We grow.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
