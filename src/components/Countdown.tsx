import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getCountdown } from '../time';

function Digit({ digit }: { digit: string }) {
  const reduce = useReducedMotion();
  return <span className="digit"><AnimatePresence mode="popLayout" initial={false}>
    <motion.span key={digit} initial={reduce ? false : { y: '55%', opacity: 0, rotateX: -35 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={reduce ? { opacity: 0 } : { y: '-55%', opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}>{digit}</motion.span>
  </AnimatePresence></span>;
}

export function Countdown({ now, target, onCelebrate }: { now: number; target: number; onCelebrate: () => void }) {
  const time = getCountdown(target, now);
  const units = [['Días', time.days], ['Horas', time.hours], ['Minutos', time.minutes], ['Segundos', time.seconds]] as const;
  return <div className="countdown-area">
    <div className="countdown" onDoubleClick={onCelebrate} role="timer" aria-label={`${time.days} días, ${time.hours} horas, ${time.minutes} minutos, ${time.seconds} segundos`}>
      {units.map(([label, value], i) => <div className="unit-wrap" key={label}>
        {i > 0 && <span className="colon" aria-hidden="true">:</span>}
        <div className="time-card glass"><div className="number" aria-hidden="true">
          {String(value).padStart(2, '0').split('').map((digit, index) => <Digit key={index} digit={digit} />)}
        </div><span className="unit-label">{label}</span></div>
      </div>)}
    </div>
    <button className="secret-button" onClick={onCelebrate}><Sparkles size={12} /> Psst… doble clic en el contador para un poquito de magia</button>
  </div>;
}
