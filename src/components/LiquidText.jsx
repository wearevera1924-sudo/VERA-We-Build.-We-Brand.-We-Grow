// ================================
// VERA SIGNATURE EFFECT
// Liquid Text — BUILD ⇄ BRAND ⇄ GROW morphing
// The words cascade letter-by-letter with blur + drift, reading as
// a "melting" transition rather than a simple fade.
// Remove <LiquidText> usages to disable.
// ================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function LiquidText({
  words = ['BUILD', 'BRAND'],
  huge = true,
  echo = true,
  className = '',
  interval = 3200
}) {
  const [index, setIndex] = useState(0);
  const word = words[index % words.length];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(t);
  }, [interval]);

  const letters = word.split('');

  return (
    <div className="liquidtext-wrap">
      <div
        className={`liquidtext ${huge ? 'liquidtext--huge' : ''} ${className || ''}`}
        role="img"
        aria-label={word}
      >
        {/* blurred echo underneath — adds atmospheric depth */}
        {echo && (
          <div className="liquidtext liquidtext--echo" aria-hidden="true">
            <div className="liquidtext-word">
              {letters.map((ch, i) => (
                <span className="liquidtext-letter" key={i}>
                  {ch}
                </span>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={word}
            className="liquidtext-word"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="liquidtext-letter"
                initial={{ y: '0.85em', opacity: 0, filter: 'blur(10px)', rotate: 5 }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotate: 0 }}
                exit={{ y: '-0.5em', opacity: 0, filter: 'blur(9px)', rotate: -4 }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: i * 0.045,
                  exit: { duration: 0.38, ease: 'easeIn', delay: (letters.length - 1 - i) * 0.025 }
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
