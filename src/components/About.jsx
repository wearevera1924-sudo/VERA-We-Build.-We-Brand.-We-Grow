import { motion } from 'framer-motion';

const LINES = [
  { type: 'display', text: 'IDEAS ARE EASY.' },
  { type: 'serif', text: 'Marketing them right' },
  { type: 'display last', text: 'IS THE REAL WORK.' }
];

const CHIPS = ['Technology', 'Design', 'Branding', 'Content', 'Marketing'];

export default function About() {
  return (
    <section className="brand" id="about">
      <div className="container">

        <div className="brand-header">
          <p className="section-label">
            <b></b> Brand - the studio
          </p>

          <div className="brand-statement">
            {LINES.map((l) => (
              <div
                className={`statement-line ${
                  l.type === 'serif' ? 'serif-line' : 'display-line'
                } ${l.type === 'display last' ? 'last-line' : ''}`}
                key={l.text}
              >
                <span>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="about-support">
          VERA is a digital &amp; creative company helping businesses build their digital presence
          product, design, brand and content moving as one continuous motion. From a first
          sketch to a name people remember.
        </p>

        <div className="about-chips">
          {CHIPS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

      </div>
    </section>
  );
}