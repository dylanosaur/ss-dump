const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.setUserAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0');

  let url = 'https://www.google.com';
  await page.goto(url);

  await page.screenshot({ path: './screenshot.png' });

  await browser.close();
})();
