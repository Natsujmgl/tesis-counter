import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { config } from '../config';
import { SpotifyPlaylist } from './SpotifyPlaylist';

export type MusicMode = 'hidden' | 'compact' | 'expanded';

export function MusicDock({ mode, onModeChange, onClose }: {
  mode: MusicMode;
  onModeChange: (mode: MusicMode) => void;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const open = mode !== 'hidden';
  const expanded = mode === 'expanded';
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open, onClose]);

  // Keep this subtree (especially the official iframe) mounted in every mode.
  return <aside id="music-dock" className="music-dock" aria-labelledby="music-dock-title" hidden={!open} inert={!open} data-mode={mode}>
    <div className="music-dock-toolbar">
      <h2 id="music-dock-title">Nuestra música</h2>
      <button className="outline-button" aria-expanded={expanded} aria-controls="music-dock-player" onClick={() => onModeChange(expanded ? 'compact' : 'expanded')}>
        {expanded ? 'Minimizar playlist' : 'Expandir playlist'}
      </button>
      <button ref={closeButton} className="outline-button" onClick={onClose} aria-label="Ocultar música">Ocultar</button>
    </div>
    <div className="music-dock-scroll">
      <div id="music-dock-player"><SpotifyPlaylist expanded={expanded} /></div>
      <a className="outline-button" href={`https://open.spotify.com/playlist/${config.spotifyPlaylistId}`} target="_blank" rel="noopener noreferrer">Abrir en Spotify <ArrowUpRight size={14} aria-hidden="true" /></a>
      {expanded && <p className="spotify-note">Elegí canciones con los controles de Spotify. Puede pedirte iniciar sesión u ofrecer solo una vista previa.</p>}
    </div>
  </aside>;
}
