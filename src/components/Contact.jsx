// ================================
// VERA CONTACT — final section
// Big CTA to WhatsApp + channels + contact form.
// ALL contact values live in src/data/contact.js — never duplicated here.
// The form opens WhatsApp with the message pre-filled (no backend needed).
// ================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import CONTACT, { CONTACT_LINKS } from '../data/contact.js';
import services from '../data/services.js';

const isUnset = (v) => typeof v === 'string' && v.includes('YOUR_');

const CHANNELS = [
  { icon: '💬', label: 'WhatsApp', value: CONTACT.whatsapp, href: CONTACT_LINKS.whatsapp },
  { icon: '✉️', label: 'Email', value: CONTACT.email, href: CONTACT_LINKS.email },
  { icon: '📸', label: 'Instagram', value: CONTACT.instagram, href: CONTACT_LINKS.instagram },
  { icon: '☎️', label: 'Phone', value: CONTACT.phone, href: CONTACT_LINKS.phone },
  { icon: '📝', label: 'Google Form', value: 'Prefer a form?', href: CONTACT_LINKS.googleForm }
];

const BLANK = { name: '', email: '', phone: '', company: '', service: '', details: '' };

export default function Contact() {
  const [form, setForm] = useState(BLANK);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Hi VERA! I'd like to start a project.`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Company / Brand: ${form.company || '—'}`,
      `Service: ${form.service}`,
      `Details: ${form.details}`
    ].filter(Boolean);
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-head">
          <motion.p
            className="section-label"
            style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <b></b> Contact
          </motion.p>
          <motion.h2
            className="serif-big"
            style={{ marginTop: 'clamp(12px,1.6vw,22px)' }}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Have something <em className="serif-it">in mind?</em>
          </motion.h2>
          <motion.p
            style={{ color: 'var(--ink-soft)', marginTop: 14, fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Let&rsquo;s turn it into something people remember.
          </motion.p>
        </div>

        <motion.div
          className="contact-cta-row"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <a className="btn btn-royal btn-lg" href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer">
            LET&rsquo;S BUILD IT <span className="u-grow-arrow">↗</span>
          </a>
        </motion.div>

        <div className="channel-grid">
          {CHANNELS.map((c) => {
            const unset = isUnset(c.value);
            return (
              <a className={`channel ${unset ? 'unset' : ''}`} key={c.label} href={unset ? undefined : c.href} target="_blank" rel="noreferrer">
                <span className="ch-arr">↗</span>
                <span className="ch-icon" aria-hidden="true">{c.icon}</span>
                <b>{c.label}</b>
                <span>{unset ? 'Set in src/data/contact.js' : c.label === 'Email' ? CONTACT.email : c.value}</span>
              </a>
            );
          })}
        </div>

        <div className="form-wrap">
          <h3 className="serif-big" style={{ fontSize: 'clamp(1.6rem,3.4vw,2.6rem)' }}>
            Or send a message <em className="serif-it">directly</em>
          </h3>
          <form style={{ marginTop: 'clamp(22px,3vw,36px)' }} onSubmit={submit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-name">Name</label>
                <input className="input" id="f-name" required value={form.name} onChange={set('name')} placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input className="input" id="f-email" type="email" required value={form.email} onChange={set('email')} placeholder="you@email.com" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input className="input" id="f-phone" value={form.phone} onChange={set('phone')} placeholder="+91" />
              </div>
              <div className="field">
                <label htmlFor="f-company">Company / Brand</label>
                <input className="input" id="f-company" value={form.company} onChange={set('company')} placeholder="Optional" />
              </div>
              <div className="field full">
                <label htmlFor="f-service">Service</label>
                <select className="select" id="f-service" value={form.service} onChange={set('service')} required>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="f-details">Project details</label>
                <textarea className="textarea" id="f-details" value={form.details} onChange={set('details')} placeholder="Tell us what you're building, branding or growing…" />
              </div>
            </div>
            <div className="form-foot">
              <button className="btn btn-royal" type="submit">
                SEND VIA WHATSAPP <span className="u-grow-arrow">↗</span>
              </button>
              <p className="form-note">
                Opens WhatsApp with your message ready or use the{' '}
                <a href={CONTACT_LINKS.googleForm} target="_blank" rel="noreferrer" style={{ color: 'var(--royal)', textDecoration: 'underline' }}>
                  Google Form ↗
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
