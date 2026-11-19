import type { SVGProps } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function RoseIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" {...props}>
    <path d="M32 74c-1.5-15 2-24 0-38" stroke="#6d8c73" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M31.5 58c-11-1-15-9-15-9 10-1.5 15 9 15 9Zm1-10c11-1.5 14-10 14-10-10 0-14 10-14 10Z" fill="#89a88c" fillOpacity=".45" stroke="#6d8c73" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M32 37c-10 0-16-7-15-15 1-7 7-11 15-11s14 4 15 11c1 8-5 15-15 15Z" fill="#e06384" fillOpacity=".35" stroke="#c03e62" strokeWidth="1.7" />
    <path d="M22 21c2-6 10-8 16-5 6 3 7 11 1 15-5 3-13 2-15-4-2-4 1-9 6-10 4-1 8 2 7 6-1 3-4 4-6 2-2-1-1-4 1-4" stroke="#c03e62" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M24 34c3 3 13 3 16 0" stroke="#6d8c73" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;
}

export function SunflowerIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" {...props}>
    <path d="M32 74c1-14-1.5-24 0-36" stroke="#6d8c73" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M31.5 57c-10-1-13-8-13-8 9-1 13 8 13 8Zm1-11c10-1 13-8 13-8-9 0-13 8-13 8Z" fill="#89a88c" fillOpacity=".42" stroke="#6d8c73" strokeWidth="1.6" strokeLinejoin="round" />
    <g fill="#f5c445" fillOpacity=".62" stroke="#c98a14" strokeWidth="1.4">
      <ellipse cx="32" cy="11" rx="3.5" ry="7.4" />
      <ellipse cx="32" cy="37" rx="3.5" ry="7.4" />
      <ellipse cx="19" cy="24" rx="7.4" ry="3.5" />
      <ellipse cx="45" cy="24" rx="7.4" ry="3.5" />
      <ellipse cx="22.8" cy="14.8" rx="3.4" ry="7" transform="rotate(-45 22.8 14.8)" />
      <ellipse cx="41.2" cy="33.2" rx="3.4" ry="7" transform="rotate(-45 41.2 33.2)" />
      <ellipse cx="41.2" cy="14.8" rx="3.4" ry="7" transform="rotate(45 41.2 14.8)" />
      <ellipse cx="22.8" cy="33.2" rx="3.4" ry="7" transform="rotate(45 22.8 33.2)" />
    </g>
    <circle cx="32" cy="24" r="7" fill="#7c4d2b" fillOpacity=".88" stroke="#5e371b" strokeWidth="1.5" />
    <circle cx="30" cy="22.5" r="1.1" fill="#f7d98c" />
    <circle cx="34" cy="23" r="1.1" fill="#f7d98c" />
    <circle cx="32" cy="26" r="1.1" fill="#f7d98c" />
  </svg>;
}

export function RosePetalIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M12 3C7 5.5 4.5 11 6.8 16.2 8.4 19.6 11.4 21 12.6 21c3.5-.3 6.8-4.5 6.4-9.8C18.6 6.8 15.2 4 12 3Z" fill="currentColor" fillOpacity=".72" stroke="currentColor" strokeWidth="1.1" />
    <path d="M12.2 6.5c-.8 3.2-.6 7 .2 11.2" stroke="#fff7fa" strokeOpacity=".6" strokeWidth="1" strokeLinecap="round" />
  </svg>;
}

export function SunflowerPetalIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M12 2.5C8.5 6 7.5 11.2 9.2 16.8 10.1 19.6 11.3 21.5 12 21.5s1.9-1.9 2.8-4.7C16.5 11.2 15.5 6 12 2.5Z" fill="#f4be37" fillOpacity=".78" stroke="#c98a14" strokeWidth="1.1" />
    <path d="M12 6v11" stroke="#fff6d6" strokeOpacity=".65" strokeWidth="1" strokeLinecap="round" />
  </svg>;
}

export function FloralGarland() {
  return <div className="floral-garland" aria-hidden="true">
    <span className="garland-vine" />
    <RosePetalIcon className="garland-petal-rose" width={14} height={14} />
    <RoseIcon className="garland-flower" width={26} height={32} />
    <SunflowerPetalIcon className="garland-petal-sun" width={14} height={14} />
    <SunflowerIcon className="garland-flower" width={28} height={34} />
    <RoseIcon className="garland-flower" width={26} height={32} />
    <RosePetalIcon className="garland-petal-rose" width={14} height={14} />
    <span className="garland-vine" />
  </div>;
}

const showerItems = [
  { left: '5%', sway: 32, rotate: 220, delay: 0, duration: 2.9, kind: 'rose' as const, size: 28 },
  { left: '11%', sway: -26, rotate: -180, delay: 0.12, duration: 2.6, kind: 'rose-petal' as const, size: 18 },
  { left: '18%', sway: 28, rotate: 160, delay: 0.05, duration: 3.1, kind: 'sunflower' as const, size: 30 },
  { left: '24%', sway: -34, rotate: 290, delay: 0.22, duration: 2.7, kind: 'sun-petal' as const, size: 17 },
  { left: '31%', sway: 24, rotate: -210, delay: 0.08, duration: 3.0, kind: 'rose' as const, size: 26 },
  { left: '38%', sway: -22, rotate: 240, delay: 0.18, duration: 2.5, kind: 'rose-petal' as const, size: 19 },
  { left: '44%', sway: 30, rotate: -160, delay: 0.03, duration: 3.2, kind: 'sunflower' as const, size: 32 },
  { left: '50%', sway: -28, rotate: 200, delay: 0.15, duration: 2.8, kind: 'rose' as const, size: 30 },
  { left: '56%', sway: 26, rotate: -260, delay: 0.25, duration: 2.6, kind: 'rose-petal' as const, size: 18 },
  { left: '62%', sway: -30, rotate: 190, delay: 0.09, duration: 3.1, kind: 'sunflower' as const, size: 28 },
  { left: '68%', sway: 22, rotate: -175, delay: 0.2, duration: 2.7, kind: 'sun-petal' as const, size: 17 },
  { left: '74%', sway: -25, rotate: 230, delay: 0.06, duration: 2.9, kind: 'rose' as const, size: 29 },
  { left: '80%', sway: 34, rotate: -220, delay: 0.16, duration: 2.6, kind: 'rose-petal' as const, size: 18 },
  { left: '86%', sway: -24, rotate: 175, delay: 0.11, duration: 3.0, kind: 'sunflower' as const, size: 30 },
  { left: '91%', sway: 20, rotate: -240, delay: 0.24, duration: 2.7, kind: 'rose-petal' as const, size: 17 },
  { left: '95%', sway: -28, rotate: 210, delay: 0.04, duration: 2.9, kind: 'rose' as const, size: 26 },
];

export function FloralShower({ burstKey }: { burstKey: number }) {
  const reduce = useReducedMotion();
  if (burstKey === 0) return null;
  return <div className="floral-shower" key={burstKey} aria-hidden="true">
    {showerItems.map((item, i) => <motion.span key={i}
      className={`shower-item shower-${item.kind}`}
      style={{ left: item.left, top: '-42px' }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: '-5vh', x: 0, rotate: 0, scale: 0.7 }}
      animate={reduce ? { opacity: [0, 0.85, 0] } : { opacity: [0, 0.96, 0.9, 0], y: ['0vh', '104vh'], x: [0, item.sway, -item.sway * 0.6, item.sway * 0.4], rotate: [0, item.rotate * 0.5, item.rotate], scale: [0.75, 1.08, 0.92] }}
      transition={{ duration: item.duration, delay: item.delay, ease: 'easeInOut' }}>
      {item.kind === 'rose' && <RoseIcon width={item.size} height={Math.round(item.size * 1.25)} />}
      {item.kind === 'sunflower' && <SunflowerIcon width={item.size} height={Math.round(item.size * 1.25)} />}
      {item.kind === 'rose-petal' && <RosePetalIcon width={item.size} height={item.size} />}
      {item.kind === 'sun-petal' && <SunflowerPetalIcon width={item.size} height={item.size} />}
    </motion.span>)}
  </div>;
}
