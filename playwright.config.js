import { defineConfig } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'file://' + path.resolve(__dirname) + '/',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list']],
});
