// ================================
// VERA SERVICES
// Sticky editorial index (number + progress) beside six rows,
// each with its own composition (browser / phone / campaign /
// poster / living type / identity). Data lives in src/data/services.js.
//
// SAFETY: each row is plain JSX - no opacity:0 baseline via Framer -
// so the list reads even if Motion's viewport observer hiccups.
// ================================
import { useEffect, useRef, useState } from 'react';
import services from '../data/services.js';
import { DeviceBrowser, DevicePhone } from './DeviceMockups.jsx';
import MagneticImage from './MagneticImage.jsx';

const POEM = 'Six disciplines. One continuous craft.';

function ServiceVisual({ type }) {
  switch (type) {
    case 'browser':
      return (
        <div className="svc-frame">
          <DeviceBrowser src="/assets/traveling.png" url="the.vera.co" label="web" alt="Website interface built by VERA" />
        </div>
      );
    case 'phone':
      return (
        <MagneticImage strength={0.2} max={9} className="svc-phone-wrap">
          <DevicePhone src="/assets/appphone.png" alt="App interface designed by VERA" />
        </MagneticImage>
      );
    case 'campaign':
      return (
        <div className="svc-frame">
          <img src="/assets/ritidigitalmarketing.png" alt="Digital marketing campaign layout by VERA" loading="lazy" />
        </div>
      );
    case 'poster':
      return (
        <div className="poster-stack">
          <img src="/assets/mag.png" alt="Editorial poster series designed by VERA" loading="lazy" />
        </div>
      );
    case 'type':
      return (
        <div className="svc-typevisual" aria-hidden="true">
          <div className="t1">words that</div>
          <div className="t2">move people</div>
        </div>
      );
    case 'identity':
    default:
      return (
        <div className="svc-frame">
          <img src="/assets/Adriti.png" alt="Brand identity system designed by VERA" loading="lazy" />
        </div>
      );
  }
}

export default function Services() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const rows = listRef.current.querySelectorAll('.svc-row');
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const r = e.target.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
          if (!best || d < best.d) best = { el: e.target, d };
        }
        if (best) setActive(Number(best.el.dataset.idx));
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0.05 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services-wrap">
          {/* Sticky editorial index */}
          <div className="svc-left">
            <p className="section-label"><b></b> Creative & Digital Services </p>
            <div className="svc-bignum" aria-hidden="true">0{active + 1}</div>
            <p className="svc-poem">{POEM}</p>
            <div className="svc-progress" aria-hidden="true">
              <i style={{ transform: `translateX(${active * 100}%)`, width: `${100 / services.length}%` }} />
            </div>
          </div>

          {/* Service rows */}
          <div className="svc-list" ref={listRef}>
            {services.map((s, i) => (
              <article
                key={s.title}
                className={`svc-row ${active === i ? 'active' : ''}`}
                data-idx={i}
              >
                <div className="svc-watermark" aria-hidden="true">{s.number}</div>
                <div className="svc-row-inner">
                  <div className={`svc-visual ${i % 2 === 1 ? 'svc-visual--flip' : ''}`}>
                    <ServiceVisual type={s.visualType} />
                  </div>
                  <div className="svc-main">
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <a className="svc-cta" href="#contact">
                      {s.cta} <span className="arr">&#8599;</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
