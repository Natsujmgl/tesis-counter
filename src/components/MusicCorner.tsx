import { type MouseEventHandler } from 'react';
import { ArrowUpRight, Headphones } from 'lucide-react';
import { config } from '../config';

export function MusicCorner({ onOpenMusic, musicOpen }: {
  onOpenMusic: MouseEventHandler<HTMLButtonElement>;
  musicOpen: boolean;
}) {
  return <section id="tu-playlist" className="music-section" aria-labelledby="music-title">
    <div className="spotify-playlist glass">
      <div className="eyebrow"><Headphones size={13} aria-hidden="true" /> NUESTRA PLAYLIST</div>
      <h2 id="music-title">Canciones para acompañarte, amorshito</h2>
      <p>Un poquito de música para tus ideas, tus pausas y todo lo lindo que viene. ♡</p>
      <div className="music-invitation-actions">
        <button className="outline-button" aria-expanded={musicOpen} aria-controls="music-dock" onClick={onOpenMusic}>Escuchar nuestra música</button>
        <a className="outline-button" href={`https://open.spotify.com/playlist/${config.spotifyPlaylistId}`} target="_blank" rel="noopener noreferrer">Abrir en Spotify <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
      <p className="spotify-note">Spotify puede pedirte iniciar sesión u ofrecer solo una vista previa según tu navegador y cuenta. Si el reproductor no carga, podés abrir la playlist con el enlace.</p>
    </div>
  </section>;
}
