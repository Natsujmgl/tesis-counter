import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MusicCorner } from './MusicCorner';

vi.mock('../config', () => ({ config: { spotifyPlaylistId: '7ckbHF0HVh7FyP6J0XpgaO' } }));

describe('playlist invitation', () => {
  it('invites opening the shared dock without embedding another player', () => {
    const onOpenMusic = vi.fn();
    const { container, rerender } = render(<MusicCorner onOpenMusic={onOpenMusic} musicOpen={false} />);
    const button = screen.getByRole('button', { name: 'Escuchar nuestra música' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'music-dock');
    fireEvent.click(button);
    expect(onOpenMusic).toHaveBeenCalledTimes(1);
    rerender(<MusicCorner onOpenMusic={onOpenMusic} musicOpen />);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByRole('link', { name: 'Abrir en Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
  });
  it('offers only one playlist invitation without albums, artist searches or owned audio', () => {
    const { container } = render(<MusicCorner onOpenMusic={vi.fn()} musicOpen={false} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Escuchar nuestra música' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Abrir en Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('region', { name: 'Canciones para acompañarte, amorshito' })).toBeInTheDocument();
    expect(screen.queryByText(/Elegí una portada/)).toBeNull();
    expect(container.querySelector('audio, iframe, a[download], a[href*="/search/"]')).toBeNull();
  });
});
