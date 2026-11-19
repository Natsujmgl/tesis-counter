import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://open.spotify.com/embed/**', route => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html lang="es"><title>Spotify simulado</title><body>Reproductor de prueba, sin audio.</body></html>',
  }));
});

for (const width of [320, 375, 1440]) {
  test(`live countdown, interactions and layout at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.clock.install({ time: new Date('2026-12-18T09:59:59Z') });
    await page.clock.pauseAt(new Date('2026-12-18T10:00:00Z'));
    await page.goto('/');
    await expect(page.getByRole('timer')).toHaveAccessibleName('1 días, 0 horas, 0 minutos, 0 segundos');
    await page.clock.runFor(1000);
    await expect(page.getByRole('timer')).toHaveAccessibleName('0 días, 23 horas, 59 minutos, 59 segundos');
    await page.clock.resume();
    const oldQuote = await page.getByRole('blockquote').innerText();
    await page.getByRole('button', { name: 'Otra frase' }).click();
    await expect(page.getByRole('blockquote')).not.toHaveText(oldQuote);
    const iframe = page.getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito');
    await expect(iframe).toHaveAttribute('src', 'https://open.spotify.com/embed/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    await expect(iframe).toHaveAttribute('loading', 'lazy');
    await expect(page.getByRole('region', { name: 'Canciones para acompañarte, amorshito' }).getByRole('link', { name: 'Abrir en Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
    for (const [label, theme] of [
      ['Tema ARIRANG · BTS', 'arirang'], ['Tema AMERI · Duki', 'ameri'],
      ['Tema SWAG · Justin', 'swag'], ['Tema Lavanda', 'lavender'],
    ]) {
      await page.getByRole('button', { name: label }).click();
      await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', theme);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await expect(page.getByRole('button', { name: /^Elegir .* y su tema visual$/ })).toHaveCount(0);
    await expect(page.locator('audio, a[download], a[href*="/search/"]')).toHaveCount(0);
    await expect(page.locator('iframe')).toHaveCount(1);
    await page.getByRole('timer').dblclick();
    await expect(page.locator('.magic-toast')).toHaveClass(/visible/);
    await expect(page.locator('canvas')).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Tema Lavanda' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.clock.runFor(5000);
    await page.screenshot({ path: `.artifacts/countdown-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('playlist-only section opens the shared player without albums or audio downloads', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const section = page.getByRole('region', { name: 'Canciones para acompañarte, amorshito' });
  await expect(section.getByRole('heading')).toHaveCount(1);
  await expect(section.getByRole('button')).toHaveCount(1);
  await expect(section.getByRole('link')).toHaveCount(1);
  await expect(section.getByRole('link', { name: 'Abrir en Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO');
  await expect(section.locator('iframe, audio, a[download], a[href*="/search/"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Elegir .* y su tema visual$/ })).toHaveCount(0);
  await expect(page.locator('audio, a[download]')).toHaveCount(0);
  const opener = section.getByRole('button', { name: 'Escuchar nuestra música' });
  await expect(opener).toHaveAttribute('aria-expanded', 'false');
  await opener.click();
  const dock = page.getByRole('complementary', { name: 'Nuestra música' });
  await expect(dock).toBeVisible();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  const iframe = dock.getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito');
  await expect(iframe).toHaveAttribute('src', 'https://open.spotify.com/embed/playlist/7ckbHF0HVh7FyP6J0XpgaO');
  await expect(page.locator('iframe')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(dock).toBeHidden();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('persistent music dock: keyboard, one request and responsive modes', async ({ page }) => {
  let requests = 0;
  page.on('request', request => {
    if (request.url().startsWith('https://open.spotify.com/embed/')) requests++;
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Nuestra música ♫' });
  const dock = page.getByRole('complementary', { name: 'Nuestra música' });
  const iframe = page.getByTitle('Playlist de Spotify: Canciones para acompañarte, amorshito');
  const node = await iframe.elementHandle();
  const src = await iframe.getAttribute('src');
  await expect(dock).toBeHidden();
  const wordmark = await page.getByRole('link', { name: 'Con amor, inicio' }).boundingBox();
  const control = await trigger.boundingBox();
  expect(control!.x).toBeGreaterThanOrEqual(wordmark!.x + wordmark!.width);
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Ocultar música' })).toBeFocused();
  await expect(iframe).toHaveAttribute('height', '152');
  await expect.poll(() => requests).toBe(1);
  for (const viewport of [{ width: 320, height: 700 }, { width: 375, height: 800 }, { width: 1440, height: 900 }, { width: 667, height: 320 }]) {
    await page.setViewportSize(viewport);
    const expand = page.getByRole('button', { name: 'Expandir playlist' });
    await expand.focus();
    await page.keyboard.press('Space');
    await expect(iframe).toHaveAttribute('height', '352');
    const minimize = page.getByRole('button', { name: 'Minimizar playlist' });
    await expect(minimize).toBeFocused();
    await expect(minimize).toHaveAttribute('aria-expanded', 'true');
    const bounds = await dock.boundingBox();
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.keyboard.press('Enter');
    await expect(iframe).toHaveAttribute('height', '152');
  }
  await page.setViewportSize({ width: 375, height: 800 });
  await page.getByRole('button', { name: 'Tema AMERI · Duki' }).click();
  await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'ameri');
  await expect(trigger).toBeInViewport();
  const theme = await page.getByRole('button', { name: 'Tema AMERI · Duki' }).boundingBox();
  const bounds = await dock.boundingBox();
  expect(theme!.y + theme!.height).toBeLessThanOrEqual(bounds!.y);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(dock).toBeHidden();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Ocultar música' }).click();
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Tab');
  expect(await page.locator('#music-dock').evaluate(el => el.contains(document.activeElement))).toBe(false);
  await trigger.click();
  await expect(dock.getByRole('link', { name: 'Abrir en Spotify' })).toBeVisible();
  await expect(iframe).toHaveAttribute('src', src!);
  expect(await node!.evaluate(el => el === document.querySelector('iframe'))).toBe(true);
  await expect(page.locator('iframe')).toHaveCount(1);
  expect(requests).toBe(1);
});

test('a little love gift opens with the keyboard on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.clock.install({ time: new Date('2026-12-18T10:00:00Z') });
  await page.goto('/');
  const letter = page.getByRole('button', { name: 'Te escribí algo, bbshita' });
  await expect(letter).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('region', { name: 'Una carta para vos' })).toHaveCount(0);
  await letter.focus();
  await page.keyboard.press('Enter');
  await expect(letter).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('region', { name: 'Una carta para vos' })).toContainText('TE AMO MI VIDA.');
  for (const section of ['.quote-card', '.music-section', '.love-note']) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.clock.runFor(1000);
  }
  await letter.scrollIntoViewIfNeeded();
  await page.clock.runFor(2000);
  await page.screenshot({ path: '.artifacts/love-letter-375.png', fullPage: true });
  await page.keyboard.press('Space');
  await expect(letter).toHaveAttribute('aria-expanded', 'false');
  for (const [label, copy] of [
    ['Abrí esto cuando tengas nervios', 'Respirá conmigo, mae.'],
    ['Abrí esto cuando estés cansada', 'Aflojá los hombros'],
    ['Abrí esto cuando dudes de vos', 'una corrección no borra tu talento'],
  ]) {
    const note = page.getByRole('button', { name: label });
    await note.focus();
    await page.keyboard.press('Enter');
    await expect(note).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.hug-message')).toContainText(copy);
  }
  const hug = page.getByRole('button', { name: 'Necesito un abrazo' });
  await hug.focus();
  await page.keyboard.press('Space');
  await expect(page.getByText(/Vení acá, bb preciosa/)).toBeVisible();
  await page.waitForTimeout(1700);
  await expect(page.locator('.hug-hearts > span').first()).toHaveCSS('opacity', '0');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await hug.click();
  await expect(page.locator('.hug-hearts')).toBeHidden();
  await expect(page.getByText(/Vení acá, bb preciosa/)).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Necesito un abrazo' }).click();
  await expect(page.locator('.hug-hearts')).toHaveCount(0);
  await expect(page.getByText(/Vení acá, bb preciosa/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.clock.runFor(2000);
  await page.screenshot({ path: '.artifacts/little-hugs-375.png', fullPage: true });
});

test('past-date celebration and reduced-motion alternative', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install({ time: new Date('2027-01-01T00:00:00Z') });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '¡Lo lograste, Licenciada!' })).toBeVisible();
  await expect(page.getByRole('timer')).toHaveAccessibleName('0 días, 0 horas, 0 minutos, 0 segundos');
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  await page.clock.runFor(1000);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button', { name: /Psst/ }).click();
  await expect(page.locator('.magic-toast')).toHaveClass(/visible/);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('expired page automatically starts confetti under StrictMode', async ({ page }) => {
  await page.clock.install({ time: new Date('2027-01-01T00:00:00Z') });
  await page.goto('/');
  await page.clock.runFor(100);
  await expect(page.locator('canvas')).toBeAttached();
  await expect(page.getByRole('heading', { name: '¡Lo lograste, Licenciada!' })).toBeVisible();
});
