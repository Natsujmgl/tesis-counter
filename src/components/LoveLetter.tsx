import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { config } from '../config';
import { RoseIcon, RosePetalIcon, SunflowerIcon } from './BotanicalIcons';

const bloomPetals = [
  { x: -115, y: -38, rotate: -38, delay: 0, kind: 'petal' as const },
  { x: -64, y: -56, rotate: 24, delay: 0.08, kind: 'rose' as const },
  { x: -16, y: -48, rotate: -18, delay: 0.14, kind: 'petal' as const },
  { x: 34, y: -54, rotate: 28, delay: 0.1, kind: 'sunflower' as const },
  { x: 82, y: -40, rotate: -26, delay: 0.18, kind: 'petal' as const },
  { x: 120, y: -24, rotate: 42, delay: 0.22, kind: 'petal' as const },
];

export function LoveLetter() {
  const [open, setOpen] = useState(false);
  const [bloomCount, setBloomCount] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const letter = config.affection.letter;

  const toggle = () => {
    setOpen(prev => {
      const next = !prev;
      if (next) setBloomCount(count => count + 1);
      return next;
    });
  };

  return <section className={`love-letter ${open ? 'is-open' : ''}`} aria-label="Una cartita de amor">
    <span className="letter-tape" aria-hidden="true" />
    {open && !reduce && bloomCount > 0 && <div className="letter-bloom" key={bloomCount} aria-hidden="true">
      {bloomPetals.map((item, i) => <motion.span key={i}
        className={`bloom-piece bloom-${item.kind}`}
        initial={{ opacity: 0, x: 0, y: 12, scale: 0.6, rotate: 0 }}
        animate={{ opacity: [0, 0.9, 0], x: item.x, y: item.y, scale: [0.6, 1.05, 0.9], rotate: item.rotate }}
        transition={{ duration: 1.75, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}>
        {item.kind === 'rose' ? <RoseIcon width={22} height={28} /> : item.kind === 'sunflower' ? <SunflowerIcon width={22} height={28} /> : <RosePetalIcon width={16} height={16} />}
      </motion.span>)}
    </div>}
    <button className="letter-toggle" aria-expanded={open} aria-controls={id} onClick={toggle}>
      <span className="wax-seal" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 25S3 17 5 10c2-6 9-5 11 0 3-6 11-5 12 1 1 6-12 14-12 14Z" stroke="currentColor" strokeWidth="1.6" /></svg></span>
      <span><span className="letter-invitation">{letter.invitation}</span><span className="letter-hint" aria-hidden="true">{open ? 'Guardá la cartita · volvé cuando quieras' : 'Una cartita, solo para vos · tocá para abrir'}</span></span>
      <span className="letter-toggle-mark" aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id={id} className="letter-paper" role="region" aria-label="Una carta para vos" hidden={!open}>
      <p className="letter-greeting">Mi amor,</p>
      {letter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p className="letter-signature">{letter.signature}</p>
      <div className="letter-botanicals" aria-hidden="true">
        <SunflowerIcon className="letter-sunflower" />
        <RoseIcon className="letter-rose" />
      </div>
    </div>
  </section>;
}
