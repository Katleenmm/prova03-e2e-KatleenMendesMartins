import { PlaywrightTestConfig } from '@playwright/test';

// headless: true automaticamente no CI (GitHub Actions), false local
const isCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  testDir: 'src/scenarios',
  timeout: 120000,
  retries: isCI ? 1 : 0, // 1 retry no CI para compensar lentidão de rede
  use: {
    trace: 'on',
    locale: 'pt-BR',
    headless: isCI ? true : false,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'off'
  },
  expect: {
    timeout: 30000
  },
  reporter: [
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never'
      }
    ]
  ]
};

export default config;
