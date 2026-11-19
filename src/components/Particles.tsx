import { motion, useReducedMotion } from 'framer-motion';
import { RoseIcon, RosePetalIcon, SunflowerIcon, SunflowerPetalIcon } from './BotanicalIcons';

const ambientFlowers = [
  { left: '4%', top: '11%', size: 34, kind: 'rose' as const, duration: 12, delay: 0 },
  { left: '92%', top: '15%', size: 32, kind: 'sunflower' as const, duration: 14, delay: 0.8 },
  { left: '12%', top: '31%', size: 28, kind: 'sunflower' as const, duration: 13, delay: 1.4 },
  { left: '86%', top: '36%', size: 32, kind: 'rose' as const, duration: 15, delay: 0.4 },
  { left: '7%', top: '54%', size: 34, kind: 'rose' as const, duration: 14, delay: 1.1 },
  { left: '91%', top: '58%', size: 32, kind: 'sunflower' as const, duration: 13, delay: 1.9 },
  { left: '14%', top: '74%', size: 30, kind: 'sunflower' as const, duration: 15, delay: 0.5 },
  { left: '85%', top: '77%', size: 34, kind: 'rose' as const, duration: 13, delay: 1.6 },
  { left: '6%', top: '91%', size: 30, kind: 'rose' as const, duration: 14, delay: 0.9 },
  { left: '90%', top: '92%', size: 32, kind: 'sunflower' as const, duration: 15, delay: 2.1 },
];

const driftingPetals = [
  { left: '9%', duration: 16, delay: 0, sway: 28, size: 16, kind: 'rose' as const },
  { left: '21%', duration: 19, delay: 2.4, sway: -26, size: 15, kind: 'sun' as const },
  { left: '34%', duration: 18, delay: 1.1, sway: 24, size: 17, kind: 'rose' as const },
  { left: '48%', duration: 21, delay: 4.0, sway: -28, size: 15, kind: 'sun' as const },
  { left: '61%', duration: 17, delay: 0.7, sway: 22, size: 16, kind: 'rose' as const },
  { left: '73%', duration: 20, delay: 3.1, sway: -24, size: 15, kind: 'sun' as const },
  { left: '84%', duration: 18, delay: 1.9, sway: 26, size: 16, kind: 'rose' as const },
  { left: '93%', duration: 22, delay: 4.8, sway: -22, size: 15, kind: 'rose' as const },
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
    {ambientFlowers.map((flower, i) => <motion.span key={`flower-${i}`}
      className={`particle-flower particle-${flower.kind}`}
      style={{ left: flower.left, top: flower.top }}
      animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-7, 7, -7], opacity: [0.35, 0.62, 0.35] }}
      transition={{ duration: flower.duration, repeat: Infinity, ease: 'easeInOut', delay: flower.delay }}>
      {flower.kind === 'rose'
        ? <RoseIcon width={flower.size} height={Math.round(flower.size * 1.25)} />
        : <SunflowerIcon width={flower.size} height={Math.round(flower.size * 1.25)} />}
    </motion.span>)}
    {!reduce && driftingPetals.map((petal, i) => <motion.span key={`petal-${i}`}
      className={`particle-petal particle-petal-${petal.kind}`}
      style={{ left: petal.left, top: '-26px' }}
      animate={{ y: ['0vh', '108vh'], x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.4], rotate: [0, 120, 250, 360], opacity: [0, 0.68, 0.55, 0] }}
      transition={{ duration: petal.duration, repeat: Infinity, ease: 'linear', delay: petal.delay }}>
      {petal.kind === 'rose'
        ? <RosePetalIcon width={petal.size} height={petal.size} />
        : <SunflowerPetalIcon width={petal.size} height={petal.size} />}
    </motion.span>)}
  </div>;
}
