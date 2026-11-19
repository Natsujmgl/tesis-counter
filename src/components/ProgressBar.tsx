import { motion } from 'framer-motion';
import { Flag, Heart } from 'lucide-react';
import { getProgress } from '../time';

export function ProgressBar({ start, end, now }: { start: number; end: number; now: number }) {
  const progress = getProgress(start, end, now);
  const format = (value: number) => new Date(value).toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
  return <section className="progress-section" aria-labelledby="progress-title">
    <div className="progress-heading"><h2 id="progress-title">Mirá todo lo que recorriste</h2><span>{Math.floor(progress)}% <Heart size={12} /></span></div>
    <div className="progress-track" role="progressbar" aria-label="Camino hacia la defensa" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(progress)}>
      <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.4, ease: 'easeOut' }} />
    </div>
    <div className="progress-labels"><span>El primer paso <small>{format(start)}</small></span><span><Flag size={12} /> Tu gran día <small>{format(end)}</small></span></div>
    <p>Cada desvelo, cada idea, cada «una página más». Todo te trajo hasta acá.</p>
  </section>;
}
