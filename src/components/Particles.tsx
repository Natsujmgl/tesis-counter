import { motion, useReducedMotion } from 'framer-motion';
import { RoseIcon, RosePetalIcon, SunflowerIcon } from './BotanicalIcons';

const ambientRoses = [
  { left: '6%', top: '14%', size: 30, kind: 'rose' as const, duration: 13, delay: 0 },
  { left: '91%', top: '20%', size: 28, kind: 'sunflower' as const, duration: 15, delay: 1.2 },
  { left: '10%', top: '52%', size: 26, kind: 'sunflower' as const, duration: 14, delay: 0.6 },
  { left: '89%', top: '60%', size: 30, kind: 'rose' as const, duration: 16, delay: 1.8 },
  { left: '7%', top: '84%', size: 28, kind: 'rose' as const, duration: 14, delay: 0.9 },
  { left: '90%', top: '88%', size: 27, kind: 'sunflower' as const, duration: 15, delay: 2.1 },
];

const driftingPetals = [
  { left: '14%', duration: 17, delay: 0, sway: 24, size: 15 },
  { left: '31%', duration: 21, delay: 3.5, sway: -28, size: 13 },
  { left: '54%', duration: 19, delay: 1.8, sway: 20, size: 16 },
  { left: '72%', duration: 22, delay: 5.2, sway: -22, size: 14 },
  { left: '84%', duration: 18, delay: 2.6, sway: 26, size: 15 },
];

export function Particles() {
  const reduce = useReducedMotion();
  return <div className="particles" aria-hidden="true">
    {Array.from({ length: 12 }, (_, i) => <motion.span key={`spark-${i}`}
      style={{ left: `${(i * 37 + 4) % 100}%`, top: `${(i * 23 + 8) % 95}%`, fontSize: i % 3 === 0 ? 19 : 12 }}
      animate={reduce ? undefined : { y: [0, -22, 0], rotate: [0, 12, 0], opacity: [0.22, 0.5, 0.22] }}
      transition={{ duration: 9 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
      {i % 4 === 0 ? '♡' : '✦'}
    </motion.span>)}
    {ambientRoses.map((flower, i) => <motion.span key={`flower-${i}`}
      className={`particle-flower particle-${flower.kind}`}
      style={{ left: flower.left, top: flower.top }}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-5, 6, -5], opacity: [0.24, 0.44, 0.24] }}
      transition={{ duration: flower.duration, repeat: Infinity, ease: 'easeInOut', delay: flower.delay }}>
      {flower.kind === 'rose'
        ? <RoseIcon width={flower.size} height={Math.round(flower.size * 1.25)} />
        : <SunflowerIcon width={flower.size} height={Math.round(flower.size * 1.25)} />}
    </motion.span>)}
    {!reduce && driftingPetals.map((petal, i) => <motion.span key={`petal-${i}`}
      className="particle-petal"
      style={{ left: petal.left, top: '-24px' }}
      animate={{ y: ['0vh', '108vh'], x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.4], rotate: [0, 120, 250, 360], opacity: [0, 0.55, 0.45, 0] }}
      transition={{ duration: petal.duration, repeat: Infinity, ease: 'linear', delay: petal.delay }}>
      <RosePetalIcon width={petal.size} height={petal.size} />
    </motion.span>)}
  </div>;
}
