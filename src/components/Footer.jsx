// ================================
// VERA FOOTER
// Visually connects with the GROW chapter via the giant ghost word.
// ================================
import { CONTACT_LINKS } from '../data/contact.js';

const EXPLORE = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

const SOCIAL = [
  { label: 'Instagram', href: CONTACT_LINKS.instagram },
  { label: 'WhatsApp', href: CONTACT_LINKS.whatsapp },
  { label: 'Email', href: CONTACT_LINKS.email },
  { label: 'Phone', href: CONTACT_LINKS.phone }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grow-ghost" aria-hidden="true">GROW</div>
      <div className="container footer-inner">
        <div className="footer-word">VERA<i>.</i></div>
        <p className="footer-tag">We build. We brand. We grow.</p>

        <div className="footer-mid">
          <div className="footer-col">
            <b>Explore</b>
            {EXPLORE.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
          </div>
          <div className="footer-col">
            <b>Social</b>
            {SOCIAL.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
          </div>
          <div className="footer-col" style={{ maxWidth: 320 }}>
            <b>Studio</b>
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--serif)', fontSize: '1.05rem', lineHeight: 1.55 }}>
              A digital &amp; creative studio for businesses of any size — building, branding and growing digital presences.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VERA. All rights reserved.</span>
          <span>
            We don&rsquo;t just make websites — <a href="#top">we create digital experiences ↗</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
