import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';
import { RoseIcon, RosePetalIcon, SunflowerIcon } from './BotanicalIcons';

const hugBurst = [
  { offset: -3, kind: 'rose' as const },
  { offset: -2, kind: 'heart' as const },
  { offset: -1, kind: 'sunflower' as const },
  { offset: 0, kind: 'petal' as const },
  { offset: 1, kind: 'rose' as const },
  { offset: 2, kind: 'heart' as const },
  { offset: 3, kind: 'sunflower' as const },
];

export function LittleHugs() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hugs, setHugs] = useState(0);
  const id = useId();
  const reduce = useReducedMotion();

  return <section className="little-hugs" aria-labelledby={`${id}-title`}>
    <p className="hugs-kicker">PARA LOS DÍAS QUE PESAN UN POQUITO</p>
    <h2 id={`${id}-title`}>Dejame estar cerquita.</h2>
    <div className="hug-notes">
      {config.affection.notes.map((note, index) => <button key={note.label} className="hug-note-button" aria-expanded={selected === index} aria-controls={`${id}-note`} onClick={() => setSelected(selected === index ? null : index)}>{note.label}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id={`${id}-note`} role="status" hidden={selected === null}>
      {selected !== null && <p className="hug-message">{config.affection.notes[selected].message}</p>}
    </div>
    <div className="hug-action">
      <button className="hug-button" onClick={() => setHugs(count => count + 1)}><Heart size={17} strokeWidth={1.5} aria-hidden="true" />Necesito un abrazo</button>
      {hugs > 0 && !reduce && <span key={hugs} className="hug-hearts" aria-hidden="true">{hugBurst.map((item, i) => <motion.span key={item.offset} initial={{ opacity: 0, y: 0, x: 0, scale: 0.7 }} animate={{ opacity: [0, 1, 0], y: -68 - (i % 3) * 10, x: item.offset * 22, scale: [0.7, 1.1, 0.9], rotate: item.offset * 14 }} transition={{ duration: 1.45, delay: i * 0.05 }}>
        {item.kind === 'rose' && <RoseIcon width={18} height={23} />}
        {item.kind === 'sunflower' && <SunflowerIcon width={18} height={23} />}
        {item.kind === 'petal' && <RosePetalIcon width={15} height={15} />}
        {item.kind === 'heart' && <Heart size={14} />}
      </motion.span>)}</span>}
    </div>
    {hugs > 0 && <p className="hug-response" role="status">{config.affection.hug}</p>}
  </section>;
}
