import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Shuffle } from 'lucide-react';
import { config } from '../config';
import { getDailyQuoteIndex, pickAnotherQuote } from '../time';

export function MotivationalQuote({ now }: { now: number }) {
  const dayIndex = getDailyQuoteIndex(new Date(now), config.quotes.length);
  const [index, setIndex] = useState(dayIndex);
  const [extra, setExtra] = useState(false);
  useEffect(() => { setIndex(dayIndex); setExtra(false); }, [dayIndex]);
  return <section className="quote-card glass" aria-labelledby="quote-heading">
    <span className="quote-decoration" aria-hidden="true">“</span>
    <div className="eyebrow" id="quote-heading"><Heart size={13} /> {extra ? 'UN ABRACITO EXTRA' : 'UN RECORDATORIO PARA HOY'}</div>
    <div className="quote-text" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait"><motion.blockquote key={index}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {config.quotes[index]}
      </motion.blockquote></AnimatePresence>
    </div>
    <div className="quote-bottom"><span>Con amor, tu fan número uno.</span>
      <motion.button className="outline-button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        onClick={() => { setIndex(pickAnotherQuote(index, config.quotes.length)); setExtra(true); }}><Shuffle size={14} /> Otra frase</motion.button>
    </div>
  </section>;
}
