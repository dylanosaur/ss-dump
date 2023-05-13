const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.setRequestInterception(true);
  await page.setUserAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0');

  page.on('request', (request) => {
    console.log('>>', request.method(), request.url(), request.headers());
    request.continue();
  });

  page.on('response', (response) => {
    console.log('<<', response.status(), response.url(), response.headers());
  });

  let url = process.argv.length > 1 ? process.argv[2] : 'https://www.google.com';
  await page.goto(url);

  const html = await page.content();
  console.log(html)
  fs.writeFileSync(`./clones/homepage.html`, html);

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
