import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  'postgresql://postgres@localhost:5432/helpdesk_test?schema=public';

const TEST_BETTER_AUTH_SECRET =
  process.env.TEST_BETTER_AUTH_SECRET ?? 'test-secret-not-for-production';

process.env.TEST_DATABASE_URL = TEST_DATABASE_URL;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'html',

  globalSetup: './global-setup.ts',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: [
    {
      command: 'bun run start',
      cwd: path.join(repoRoot, 'server'),
      url: 'http://localhost:3000/api/health',
      reuseExistingServer: false,
      timeout: 60_000,
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        DATABASE_URL: TEST_DATABASE_URL,
        BETTER_AUTH_SECRET: TEST_BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: 'http://localhost:3000',
        SEED_ADMIN_EMAIL: 'admin@test.local',
        SEED_ADMIN_PASSWORD: 'TestPassword123!',
        PORT: '3000',
      },
    },
    {
      command: 'bun run dev',
      cwd: path.join(repoRoot, 'client'),
      url: 'http://localhost:5173',
      reuseExistingServer: false,
      timeout: 60_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
