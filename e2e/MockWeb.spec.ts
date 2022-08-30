import { Page } from '@playwright/test'
import { readFileSync } from 'fs'

export const mockWeb3 = async (page: Page, fn: Function) => {
  await page.addInitScript({
    content:
      readFileSync(
        require.resolve('@depay/web3-mock/dist/umd/index.bundle.js'),
        'utf-8',
      ) +
      '\n' +
      `(${fn.toString()})();`,
  })
}