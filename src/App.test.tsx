import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { config } from './config';
import { getDailyQuoteIndex } from './time';

// jsdom checks state and interactions, not exit-animation timing.
vi.mock('framer-motion', async importOriginal => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return { ...actual, AnimatePresence: ({ children }: { children: import('react').ReactNode }) => children };
});
vi.mock('canvas-confetti', () => ({ default: Object.assign(vi.fn(), { reset: vi.fn() }) }));
import confetti from 'canvas-confetti';

afterEach(() => { vi.useRealTimers(); vi.clearAllMocks(); });

function at(date: string) { vi.useFakeTimers(); vi.setSystemTime(new Date(date)); }

describe('romantic countdown public interface', () => {
  it('keeps the countdown, personal footer and quote intact while opening the gift', () => {
    at('2026-12-18T09:59:58');
    render(<App />);
    const quote = screen.getByRole('blockquote').textContent;
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(config.name);
    expect(screen.getByText(new RegExp(config.career))).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Te escribí algo, bbshita' }));
    fireEvent.click(screen.getByRole('button', { name: 'Necesito un abrazo' }));
    expect(screen.getByRole('timer')).toHaveAccessibleName('1 días, 0 horas, 0 minutos, 2 segundos');
    expect(screen.getByRole('blockquote').textContent).toBe(quote);
    expect(screen.getByText('Hecho con amor para la futura Licenciada 💜')).toBeInTheDocument();
  });
  it('updates every second and cleans up its timer on unmount', () => {
    at('2026-12-18T09:59:58');
    const view = render(<App />);
    expect(screen.getByRole('timer')).toHaveAccessibleName('1 días, 0 horas, 0 minutos, 2 segundos');
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByRole('timer')).toHaveAccessibleName('1 días, 0 horas, 0 minutos, 1 segundos');
    view.unmount();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(vi.getTimerCount()).toBe(0);
  });
  it('shows the daily phrase and changes it with Otra frase, then resets on a new day', () => {
    at('2026-12-16T23:59:59');
    render(<App />);
    const daily = config.quotes[getDailyQuoteIndex(new Date(), config.quotes.length)];
    expect(screen.getByRole('blockquote')).toHaveTextContent(daily);
    fireEvent.click(screen.getByRole('button', { name: 'Otra frase' }));
    expect(screen.getByRole('blockquote')).not.toHaveTextContent(daily);
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('UN RECORDATORIO PARA HOY')).toBeInTheDocument();
  });
  it('celebrates when the countdown expires and accepts double click', () => {
    at('2026-12-19T09:59:59');
    render(<App />);
    expect(screen.queryByText('¡Lo lograste, Licenciada!')).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('¡Lo lograste, Licenciada!')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1); });
    expect(confetti).toHaveBeenCalledTimes(3);
    fireEvent.doubleClick(screen.getByRole('timer'));
    expect(confetti).toHaveBeenCalledTimes(6);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
  it('renders the past-date celebration and accessible confetti button', () => {
    at('2027-01-01T10:00:00');
    render(<App />);
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByText('¡Lo lograste, Licenciada!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Psst/ }));
    expect(confetti).toHaveBeenCalledTimes(6);
    expect(screen.getByText('Hecho con amor para la futura Licenciada 💜')).toBeInTheDocument();
  });
  it('offers the configured official playlist without forced playback and keeps its external fallback', () => {
    render(<App />);
    const region = screen.getByRole('region', { name: 'Canciones para acompañarte, amorshito' });
    expect(within(region).queryByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito')).toBeNull();
    fireEvent.click(within(region).getByRole('button', { name: 'Escuchar nuestra música' }));
    const dock = screen.getByRole('complementary', { name: 'Nuestra música' });
    const iframe = within(dock).getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', 'https://open.spotify.com/embed/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    expect(iframe).toHaveAttribute('loading', 'lazy');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '152');
    expect(iframe.getAttribute('allow')).toContain('encrypted-media');
    expect(iframe.getAttribute('allow')).not.toContain('autoplay');
    expect(iframe).not.toHaveAttribute('autoplay');
    const link = within(region).getByRole('link', { name: 'Abrir en Spotify' });
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(region).getByText(/Spotify puede pedirte iniciar sesión/)).toBeInTheDocument();
    expect(within(region).getByRole('heading', { name: 'Canciones para acompañarte, amorshito' })).toBeInTheDocument();
  });
  it('keeps one player and URL through dock modes and theme changes, returning focus on Escape', () => {
    const { container } = render(<App />);
    const opener = screen.getByRole('button', { name: 'Nuestra música ♫' });
    const iframe = screen.getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito');
    const src = iframe.getAttribute('src');
    expect(screen.queryByRole('complementary', { name: 'Nuestra música' })).toBeNull();
    expect(opener).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(opener);
    const dock = screen.getByRole('complementary', { name: 'Nuestra música' });
    expect(opener).toHaveAttribute('aria-controls', dock.id);
    expect(opener).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Ocultar música' })).toHaveFocus();
    const expand = screen.getByRole('button', { name: 'Expandir playlist' });
    expand.focus();
    fireEvent.click(expand);
    expect(iframe).toHaveAttribute('height', '352');
    expect(expand).toHaveFocus();
    expect(expand).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Minimizar playlist' }));
    expect(iframe).toHaveAttribute('height', '152');
    fireEvent.click(screen.getByRole('button', { name: 'Tema AMERI · Duki' }));
    expect(container.querySelector('.app-shell')).toHaveAttribute('data-theme', 'ameri');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(opener).toHaveFocus();
    expect(dock).not.toBeVisible();
    expect(dock).toHaveAttribute('hidden');
    fireEvent.click(opener);
    fireEvent.click(screen.getByRole('button', { name: 'Ocultar música' }));
    expect(opener).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Escuchar nuestra música' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Escuchar nuestra música' })).toHaveFocus();
    expect(screen.getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito')).toBe(iframe);
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(iframe).toHaveAttribute('src', src);
  });
  it('places all five themes in the header and triggers the rose and sunflower shower alongside the playlist-only section', () => {
    at('2026-12-01T10:00:00');
    const { container } = render(<App />);
    const header = within(screen.getByRole('banner'));
    const picker = within(header.getByRole('group', { name: 'Elegí una atmósfera' }));
    expect(picker.getAllByRole('button')).toHaveLength(5);
    for (const [label, theme] of [
      ['Tema ARIRANG · BTS', 'arirang'], ['Tema SWAG II · Justin', 'swag-ii'],
      ['Tema SWAG · Justin', 'swag'], ['Tema AMERI · Duki', 'ameri'],
      ['Tema Lavanda', 'lavender'],
    ]) {
      fireEvent.click(picker.getByRole('button', { name: label }));
      expect(container.querySelector('.app-shell')).toHaveAttribute('data-theme', theme);
      expect(picker.getByRole('button', { name: label })).toHaveAttribute('aria-pressed', 'true');
    }
    fireEvent.click(screen.getByRole('button', { name: /Lluvia de rosas y girasoles/i }));
    expect(container.querySelector('.floral-shower')).toBeInTheDocument();
    const region = screen.getByRole('region', { name: 'Canciones para acompañarte, amorshito' });
    expect(within(region).getAllByRole('button')).toHaveLength(1);
    expect(within(region).getByRole('button', { name: 'Escuchar nuestra música' })).toBeInTheDocument();
    expect(within(region).getAllByRole('link')).toHaveLength(1);
    expect(within(region).getByRole('link', { name: 'Abrir en Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    expect(container.querySelector('audio, a[download], a[href*="/search/"]')).toBeNull();
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
  });
});
