// ================================
// VERA - Safer motion presets
// All hero/landing animations default VISIBLE - the animation is layered on top,
// so if Motion fails or framer-motion's animation loop hangs,
// the underlying JSX is still rendered and readable.
// ================================
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { y: 18, opacity: 0 },   // small offset only - text remains ~readable
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export function FadeUp({ children, delay = 0, as = 'div', className, style }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={fadeUp.initial}
      animate={{ ...fadeUp.animate, transition: { ...fadeUp.transition, delay } }}
    >
      {children}
    </MotionTag>
  );
}
