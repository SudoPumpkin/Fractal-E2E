import { delay } from "../e2e/helpers.spec";
//import { Browser, BrowserContext, Page } from '@playwright/test';

const { test: base, chromium, webkit, expect } = require('@playwright/test')
const path = require('path')

const extensionPath = path.join(__dirname, '../metamask') // make sure this is correct

const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit }
    const launchOptions = {
      devtools: false,
      headless: false,
      args: [
       `--disable-extensions-except=${extensionPath}`,
       //`--load-extension=${extensionPath}`
      ],
      viewport: {
        width: 1000,
        height: 800
      }
    }
    const context = await browserTypes[browserName].launchPersistentContext(
      'TestProfile', ///tmp/test-user-data-dir
      launchOptions
    )
    await use(context)
    await context.close()
  }
});

test.describe('Connect Wallet', () => {
    test('Login MetaMask', async ({ browser, context }) => {
      // let browser: Browser;
      // let context: BrowserContext;
     const page = await context.newPage();
      await delay(5000);
      await page.reload();
      //await page.keyboard.press('Control+2');
      await page.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/select-action');
      await page.reload();
      // Click text=Import wallet
      await page.locator('text=Import wallet').click();
      await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/metametrics-opt-in');
      //await page.pause();
      await page.reload();
      // Click [data-testid="page-container-footer-next"]
      await page.locator('[data-testid="page-container-footer-next"]').click();
      await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/create-password/import-with-seed-phrase');

        // Click [placeholder="Paste Secret Recovery Phrase from clipboard"]
  await page.locator('[placeholder="Paste Secret Recovery Phrase from clipboard"]').click();
  // Fill [placeholder="Paste Secret Recovery Phrase from clipboard"]
  await page.locator('[placeholder="Paste Secret Recovery Phrase from clipboard"]').fill('liar input bronze remember clean harsh imitate bulb anchor sight park fade');
  // Click #password
  await page.locator('#password').click();
  // Fill #password
  await page.locator('#password').fill('FractalT35t_2022!');
  // Click #confirm-password
  await page.locator('#confirm-password').click();
  // Fill #confirm-password
  await page.locator('#confirm-password').fill('FractalT35t_2022!');
  // Click div[role="checkbox"] >> nth=1
  await page.locator('div[role="checkbox"]').nth(1).click();
  // Click button:has-text("Import")
  await page.locator('button:has-text("Import")').click();
  await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#initialize/end-of-flow');
  // assert text=Congratulations
  await page.locator('text=Congratulations');
  // Click text=All Done
  await page.locator('text=All Done').click();
  // Go to Fractal dev
  await page.goto('https://app.dev.fractalframework.xyz/');
  //await page.pause();

  // Click button:has-text("Connect Wallet")
  await page.locator('button:has-text("Connect Wallet")').click();
  // Click button[role="menuitem"]:has-text("Connect Wallet")
  await page.locator('button[role="menuitem"]:has-text("Connect Wallet")').click();
  // Follows MetaMask popup window
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('text=MetaMaskConnect to your MetaMask Wallet').click()
  ]);
  //await page.pause();
   // Click text=Next
   await popup.locator('text=Next').click();

   //await page.pause();
   // Click 'Connect' - I know it's an ugly selector but it's hidden deep within the html =/
   await popup.click('//*[@id="app-content"]/div/div[3]/div/div[2]/div[2]/div[2]/footer/button[2]');
   //await newPage.locator('text=Connect').click();
   //await page.pause();
  //button[role="menuitem"]:has-text("Connect Wallet
 // await page.pause();
  // Go to another tab
  // something
  //await page.keyboard.press('Control+Tab');
  //const context = await browser.newContext();
// const page4 = await context.newPage();
//   await page4.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#connect/192068ca-982d-4d76-95c3-4eaad7109638/confirm-permissions');
//   await page.pause();
//   // Click text=Next
//   await page.locator('text=Next').click();
//   await expect(page).toHaveURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/home.html#connect/192068ca-982d-4d76-95c3-4eaad7109638/confirm-permissions')
  // Open new page
// const context = await browser.newContext();
// const page4 = await context.newPage();
// await page4.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html');
// // Click text=MetaMaskConnect to your MetaMask Wallet
// await page.locator('text=MetaMaskConnect to your MetaMask Wallet').click();
// await page.waitForURL('chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html#connect/5b31749a-0103-4698-a804-9b2d919b3057');
// // Go to chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html#connect/5b31749a-0103-4698-a804-9b2d919b3057/confirm-permissions
// await page4.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html#connect/5b31749a-0103-4698-a804-9b2d919b3057/confirm-permissions');
// // Go to chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html#
// await page4.goto('chrome-extension://daackfnalkpkoipabdoioillppgeekja/notification.html#');
// // Close page
// await page4.close();
// // Click #switchChain
// await page.locator('#switchChain').click();
  
  // Note that Promise.all prevents a race condition
// between clicking and waiting for the popup.
// const [popup] = await Promise.all([
//   // It is important to call waitForEvent before click to set up waiting.
//   page.waitForEvent('popup'),
//   // Click text=MetaMaskConnect to your MetaMask Wallet
//   page.locator('text=MetaMaskConnect to your MetaMask Wallet').click()]);
//   await popup.waitForLoadState();
//   console.log(await popup.title());

  //const confirm = page.locator('//div[@class="Toastify"]');

  //await page.reload;
 //await page.pause();
    });
});