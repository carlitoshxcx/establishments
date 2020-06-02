const puppeteer = require('puppeteer');

/**
 * Get browser
 * Return Promise<Browser>
 */
async function getBrowser() {
  const browser = await puppeteer.launch({
    headless: false // Puppeteer is 'headless' by default.
  });

  return browser;
}

module.exports.getBrowser = getBrowser;