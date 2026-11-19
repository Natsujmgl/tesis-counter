import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';

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
      {hugs > 0 && !reduce && <span key={hugs} className="hug-hearts" aria-hidden="true">{[-2, -1, 0, 1, 2].map((offset, i) => <motion.span key={offset} initial={{ opacity: 0, y: 0, x: 0 }} animate={{ opacity: [0, 1, 0], y: -65 - i * 5, x: offset * 25 }} transition={{ duration: 1.3, delay: i * 0.06 }}><Heart size={14} /></motion.span>)}</span>}
    </div>
    {hugs > 0 && <p className="hug-response" role="status">{config.affection.hug}</p>}
  </section>;
}
