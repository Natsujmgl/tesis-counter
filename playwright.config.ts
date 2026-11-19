import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 15000,
  retries: 0,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4173', timezoneId: 'UTC', headless: true },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
});
