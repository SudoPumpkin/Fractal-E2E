import puppeteer from 'puppeteer'
import dappeteer from '@chainsafe/dappeteer';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {
    const browser = await dappeteer.launch(puppeteer, { metamaskVersion: 'v10.8.1', defaultViewport: null });
    const metamask = await dappeteer.setupMetamask(browser,{seed: "liar input bronze remember clean harsh imitate bulb anchor sight park fade"});
    await metamask.addNetwork({networkName: "Avax",rpc: "https://api.avax.network/ext/bc/C/rpc",chainId: "43114",symbol: "AVX"})
    await metamask.switchNetwork('Avax')
    const page = await browser.newPage()
    await page.goto('https://traderjoexyz.com/trade')
    await page.waitForXPath('//div[contains(@class,"open-currency-select-button")]');
    var originSelector = await page.$x('//div[contains(@class,"open-currency-select-button")]');
    await originSelector[0].click();
    var input = await page.waitForSelector('input#token-search-input');
    await input.type("BNB");
    input = await page.$x('//div[contains(@class,"token-item-0x264c1383EA520f73dd837F915ef3a732e204a493")]');
    await input[0].click();
    await sleep(2000);
    await originSelector[1].click();
    var input = await page.waitForSelector('input#token-search-input'); 
    await input.type("USDC");
    input = await page.$x('//div[contains(@class,"token-item-")]');
    await input[0].click();
    await sleep(2000);
    input = await page.$x('//*[contains(@title,"Token Amount")]');
    await input[0].type("1");
    await sleep(1000);
    input = await page.$x('//button[contains(text(),"Connect Wallet")]');
    await input[0].click();
    input = await page.waitForSelector("button#connect-METAMASK");
    await input.click();
    await metamask.approve({allAccounts: false});
    page.bringToFront();
    input = await page.waitForSelector("button#swap-button");
    await input.click();
    await metamask.confirmTransaction();
}

main()