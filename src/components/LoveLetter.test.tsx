import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LoveLetter } from './LoveLetter';

it('keeps the letter private until opened and closes it with the same semantic button', () => {
  render(<LoveLetter />);
  const toggle = screen.getByRole('button', { name: 'Te escribí algo, bbshita' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-controls');
  expect(screen.queryByRole('region', { name: 'Una carta para vos' })).not.toBeInTheDocument();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const letter = screen.getByRole('region', { name: 'Una carta para vos' });
  expect(letter.id).toBe(toggle.getAttribute('aria-controls'));
  expect(letter).toHaveTextContent('Te amo con todo mi corazón bbsita mía, cada vez falta menos para el gran día.');
  expect(letter).toHaveTextContent('Todo este tiempo lleno de tropiezos, incertidumbre y noches desveladas van a tener su recompensa.');
  expect(letter).toHaveTextContent('Durante todo este tiempo te vi esforzandote contra todo pronóstico, profesores, compañeros, vos e incluso la vida misma.');
  expect(letter).toHaveTextContent('Pero mirá hasta dónde llegaste, demuestra tu coraje, resiliencia y fuerza de voluntad. Nunca te subestimes, sos mucho y más de lo que pensas.');
  expect(letter).toHaveTextContent('Te amo demasiado y espero poder verte seguir logrando aún cosas más grandes.');
  expect(letter).toHaveTextContent('TE AMO MI VIDA.');
  expect(letter).toHaveTextContent('Atte, tu esposito.');
  expect(letter.querySelector('.letter-rose')).toBeInTheDocument();
  expect(letter.querySelector('.letter-sunflower')).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('region', { name: 'Una carta para vos' })).not.toBeInTheDocument();
});
