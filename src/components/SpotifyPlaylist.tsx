import { config } from '../config';

export function SpotifyPlaylist({ expanded }: { expanded: boolean }) {
  return <iframe
      title="Playlist de Spotify: Canciones para acompañarte, amorshito"
      src={`https://open.spotify.com/embed/playlist/${config.spotifyPlaylistId}`}
      width="100%" height={expanded ? 352 : 152} loading="lazy"
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    />;
}
