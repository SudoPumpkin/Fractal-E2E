import { delay } from "../e2e/helpers.spec";

const { test: base, chromium, webkit } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../metamask') // make sure this is correct

const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: true,
      headless: false,
      args: [
       `--disable-extensions-except=${extensionPath}`,
       `--load-extension=${extensionPath}`
      ],
      viewport: {
        width: 800,
        height: 600
      }
    }
    const context = await browserTypes[browserName].launchPersistentContext(
      '/tmp/test-user-data-dir',
      launchOptions
    )
    await use(context)
    await context.close()
  }
});

test.describe('Popup', () => {
    test('our extension loads', async ({ page }) => {
      //await page.pause(); //this is here to stop the test to confirm local extensions are present with the correct browser 
      //await page.delay(4000);
      await page.goto(
        'https://google.com',
      )
      await page.reload();
      await page.waitForTimeout(30000); // this is here so that it won't automatically close the browser window

    })
  })