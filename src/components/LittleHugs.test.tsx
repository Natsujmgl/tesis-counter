import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LittleHugs } from './LittleHugs';

it('opens one comforting note at a time and can fold it away', () => {
  render(<LittleHugs />);
  const notes = [
    ['Abrí esto cuando tengas nervios', 'Respirá conmigo, mae. No hace falta que los nervios se vayan para dar el próximo pasito. Todo lo que aprendiste sigue ahí. Yo creo en vos, incluso cuando te tiembla un poquito la voz.'],
    ['Abrí esto cuando estés cansada', 'Vení, bbshita. Aflojá los hombros, tomá un poquito de agua y dejá la tesis un ratito. Descansar no te hace menos dedicada. No tenés que poder con todo para que esté orgulloso de vos.'],
    ['Abrí esto cuando dudes de vos', 'Amorshito, una corrección no borra tu talento. Tu manera de mirar y crear vale mucho, aunque hoy te cueste verlo. No sos una nota: sos mi bb preciosa, y te amo en todas tus versiones.'],
  ];
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  for (const [label, copy] of notes) {
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('status').id).toBe(button.getAttribute('aria-controls'));
    expect(screen.getByRole('status').textContent).toBe(copy);
    for (const [other] of notes.filter(([name]) => name !== label)) {
      expect(screen.getByRole('button', { name: other })).toHaveAttribute('aria-expanded', 'false');
    }
  }
  fireEvent.click(screen.getByRole('button', { name: notes[2][0] }));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

it('offers a repeatable inline hug without replacing the selected note', () => {
  render(<LittleHugs />);
  fireEvent.click(screen.getByRole('button', { name: 'Abrí esto cuando tengas nervios' }));
  const note = screen.getByRole('status').textContent;
  const hug = screen.getByRole('button', { name: 'Necesito un abrazo' });
  for (let i = 0; i < 2; i++) {
    fireEvent.click(hug);
    expect(screen.getByText('Vení acá, bb preciosa. Te abrazo sin apuro. No tenés que resolver nada en este ratito; quedate conmigo, así como estás.')).toBeVisible();
    expect(screen.getAllByRole('status')[0].textContent).toBe(note);
  }
});
