import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { join } from 'path';
// import { ChromeExtensionOptions } from './tests-examples/chrome-extension';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<ChromeExtensionOptions> = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 0,
  retries: 0,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000
  },
  use: {
		headless: false,
		viewport: { width: 1280, height: 720 },
		actionTimeout: 25000,
		ignoreHTTPSErrors: true,
		//contextOptions: { recordHar: { path: './har_files/entiresuite.har' }},
		video: 'on',
		screenshot: 'on',
		launchOptions: {
			slowMo: 100,
		},
	},
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
		// List reporter for getting updates as they run to STDOut
		['list'],
		// HTML output because it's pretty
		['html', {
			// Output HTML files to test-results-html folder
			// HTML reporter will clear its output directory prior to being generated,
			outputFolder: 'html',
			// Never open a server
			open: 'never',
		}],
		// JSON output required for Bolt notification
		['json', { outputFile: 'test-results/results.json' }],
	],
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
  //   actionTimeout: 0,
  //   /* Base URL to use in actions like `await page.goto('/')`. */
  //   // baseURL: 'http://localhost:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        chromeExtensions: {
          paths: [join(__dirname, '../person 1/10.14.6_0')],
      },
    },
    },
    {
			name: 'ChromeLocal',
			use: {
				browserName: 'chromium',
				launchOptions: {
          headless: false,
					executablePath: process.env.CHROME_PATH,
				},
			},
			snapshotDir: 'snapshots/chrome',
		},
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
