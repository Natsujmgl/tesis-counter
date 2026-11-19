import { useCallback, useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowDown, Check, Flower2, Heart, Moon, Sparkles, Stars } from 'lucide-react';
import { config, themes, type Theme } from './config';
import { Countdown } from './components/Countdown';
import { MotivationalQuote } from './components/MotivationalQuote';
import { ProgressBar } from './components/ProgressBar';
import { Particles } from './components/Particles';
import { MusicCorner } from './components/MusicCorner';
import { MusicDock, type MusicMode } from './components/MusicDock';
import { LoveLetter } from './components/LoveLetter';
import { LittleHugs } from './components/LittleHugs';

const target = new Date(config.defenseDate).getTime();
const start = new Date(config.startDate).getTime();

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export default function App() {
  const [now, setNow] = useState(Date.now);
  const [theme, setTheme] = useState<Theme>('lavender');
  const [magic, setMagic] = useState(false);
  const [musicMode, setMusicMode] = useState<MusicMode>('hidden');
  const musicOpener = useRef<HTMLButtonElement | null>(null);
  const closeMusic = useCallback(() => {
    setMusicMode('hidden');
    musicOpener.current?.focus();
  }, []);
  const openMusic = (event: MouseEvent<HTMLButtonElement>) => {
    musicOpener.current = event.currentTarget;
    setMusicMode('compact');
  };
  const reduce = useReducedMotion();
  const celebrated = useRef(false);
  const magicTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const complete = now >= target;
  const validConfig = Number.isFinite(target) && Number.isFinite(start) && start < target && config.quotes.length > 0;

  const celebrate = useCallback(() => {
    setMagic(true);
    clearTimeout(magicTimeout.current);
    magicTimeout.current = setTimeout(() => setMagic(false), 3500);
    if (reduce) return;
    // Full-screen canvas; the burst is bounded and never loops indefinitely.
    const colors = ['#b59ad2', '#e9bac8', '#d5b77c', '#ffffff'];
    void confetti({ particleCount: 130, spread: 110, origin: { y: 0.4 }, colors, disableForReducedMotion: true, zIndex: 100 });
    void confetti({ particleCount: 65, angle: 60, spread: 75, origin: { x: 0, y: 0.65 }, colors, disableForReducedMotion: true, zIndex: 100 });
    void confetti({ particleCount: 65, angle: 120, spread: 75, origin: { x: 1, y: 0.65 }, colors, disableForReducedMotion: true, zIndex: 100 });
  }, [reduce]);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 1000);
    window.addEventListener('focus', tick);
    return () => { clearInterval(interval); window.removeEventListener('focus', tick); };
  }, []);
  useEffect(() => {
    if (!complete || !validConfig || celebrated.current) return;
    // Defer the burst so React StrictMode's rehearsal cleanup cannot erase it.
    const burst = setTimeout(() => { celebrated.current = true; celebrate(); }, 0);
    return () => clearTimeout(burst);
  }, [complete, validConfig, celebrate]);
  useEffect(() => () => { clearTimeout(magicTimeout.current); confetti.reset(); }, []);

  return <div className="app-shell" data-theme={theme} data-music-mode={musicMode}>
    <a className="skip-link" href="#main">Ir al contenido</a>
    <Particles />
    <header className="site-header">
      <a className="wordmark" href="#" aria-label="Con amor, inicio"><Flower2 size={23} strokeWidth={1.3} /> con amor<span className="wordmark-dot">.</span></a>
      <button className="music-header-toggle outline-button" aria-expanded={musicMode !== 'hidden'} aria-controls="music-dock" onClick={event => musicMode === 'hidden' ? openMusic(event) : closeMusic()}>Nuestra música ♫</button>
      <div className="header-right"><span className="tiny-note">Tu esposito aromantico</span><span className="header-heart"><Heart size={15} strokeWidth={1.5} /></span></div>
    </header>
    <main id="main">
      {!validConfig ? <section className="config-error" role="alert"><h1>Revisemos las fechas, mi amor.</h1><p>En src/config.ts, elegí fechas válidas, un inicio anterior a la defensa y al menos una frase.</p></section> : <>
        <section className="hero" aria-labelledby="hero-title">
          <motion.div className="hero-badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><span /> {complete ? 'EL COMIENZO DE ALGO HERMOSO' : 'CADA VEZ FALTA MENOS UFF'}</motion.div>
          <h1 id="hero-title">{complete ? <>El mundo es tuyo,<br /></> : <>Un pasito más.<br /></>}
            <motion.span className="hero-name" aria-label={config.name} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.045 } } }}>
              {Array.from(config.name).map((letter, i) => <motion.span aria-hidden="true" key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{letter}</motion.span>)}
            </motion.span><span className="hero-star" aria-hidden="true">✧</span>
          </h1>
          <p className="hero-description">{complete ? 'Mirá hasta dónde llegaste, amorshito. Qué orgullo acompañarte.' : 'Mientras vos le ponés el corazón a tu tesis, yo te guardo este abrazo.'}<br /><span>No tenés que poder con todo, mae. Recordá que no estás sola.</span></p>
          <div className="defense-tag"><span className="line" /><span>{config.career} <span className="tag-dot">·</span> Defensa de tesis</span><span className="line" /></div>
          {complete && <motion.div className="celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status"><Sparkles size={17} /><h2>¡Lo lograste, Licenciada!</h2><Sparkles size={17} /></motion.div>}
          <Countdown now={now} target={target} onCelebrate={celebrate} />
          <p className="defense-date"><span className="date-spark">✦</span> {new Date(target).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })} <span> · </span> {new Date(target).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })} h <span className="date-spark">✦</span></p>
          <a className="scroll-cue" href="#para-vos" aria-label="Ver tu recordatorio de hoy"><ArrowDown size={17} /></a>
          <span className="hero-doodle doodle-left" aria-hidden="true">✺</span><span className="hero-doodle doodle-right" aria-hidden="true">♡</span>
        </section>
        <div className="content-column" id="para-vos">
          <LoveLetter />
          <LittleHugs />
          <Reveal><MotivationalQuote now={now} /></Reveal>
          <Reveal><ProgressBar start={start} end={target} now={now} /></Reveal>
        </div>
        <div className="wide-column"><Reveal><MusicCorner onOpenMusic={openMusic} musicOpen={musicMode !== 'hidden'} /></Reveal></div>
        <Reveal className="love-note-wrap"><section className="love-note" aria-labelledby="love-note-title"><span className="note-pin" aria-hidden="true">♡</span>
          <div className="eyebrow">ENTRE NOSOTROS</div><h2 id="love-note-title">No es solo un título, <em>amorshito.</em></h2>
          <p>Es tu creatividad encontrando su lugar. Tu valentía, incluso con nervios.<br className="desktop-break" /> Es cada vez que seguiste, aunque costara.</p>
          <p>Y pase lo que pase, de algo estoy seguro:<br /><strong>mi persona favorita ya sos vos.</strong></p>
          <span className="note-signature">Te amo un montón ♡</span>
          <div className="fandom-notes"><span><Flower2 size={13} /> Un poquito de Maomao</span><span><Stars size={13} /> La fuerza de una protagonista</span><span><Moon size={13} /> Y mil nuevos capítulos</span></div>
          <p className="fandom-caption">Para las pausas entre La boticaria, Demon Slayer y Re:Zero.</p>
        </section></Reveal>
      </>}
    </main>
    <footer className="site-footer"><div className="theme-picker" role="group" aria-label="Elegí una atmósfera">
      {themes.map(item => <button key={item.id} title={item.label} aria-label={`Tema ${item.label}`} aria-pressed={theme === item.id} style={{ background: item.color }} onClick={() => setTheme(item.id)}>{theme === item.id && <Check size={12} />}</button>)}
    </div><p>Hecho con amor para la futura Licenciada 💜</p><span className="footer-small">PARA VOS. SIEMPRE.</span></footer>
    <MusicDock mode={musicMode} onModeChange={setMusicMode} onClose={closeMusic} />
    <div className={`magic-toast ${magic ? 'visible' : ''}`} role="status">Un poquito de magia para mi persona favorita ✨</div>
  </div>;
}
