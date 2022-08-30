import { test } from '@playwright/test';
import { mockWeb3 } from '../e2e/MockWeb.spec'
import { delay } from '../e2e/helpers.spec'


test('test wallet connection', async ({ page }) => {
  
  await mockWeb3(page, () => {
    // @ts-ignore
    Web3Mock.mock({
      blockchain: 'ethereum',
      //rinkebyETH
      accounts: { return: ['0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e'] },
    })
  })

  await page.goto('http://localhost:3000/');
  //await page.goto('https://app.dev.fractalframework.xyz/#/daos/new');
  await page.pause();
  await page.locator('a[href="#/daos/new"]').click();
  await page.locator('input[type="text"]').waitFor();
  await page.click('button:has-text("* * *Connect Wallet")');
 
  

// const { chromium } = require('playwright');
// (async () => {
//   const browser = await chromium.launch({
//     channel: 'chrome',  
//     headless: false,
//     executablePath: '/applications/google chrome canary.app/contents/macos/google chrome canary',
// });
// const context = await browser.newContext();
// const page = await context.newPage();
//   // Click text=Connect to your Web3 Wallet
//   //await page.locator('text=Connect to your Web3 Wallet').click();
//   // ---------------------
//   await context.close();
//   await browser.close();
// })()
})