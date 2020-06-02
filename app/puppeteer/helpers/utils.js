
/**
 * Get current page
 * @param browser
 */
async function getPage(browser) {
  const pages = await browser.pages();
  return new Promise((resolve) => {
    if (pages.length) { resolve(pages[pages.length - 1]); }
  }, (reject) => {
    reject();
  });
}

/**
 * Fill input with text
 * @param page
 * @param selector
 * @param text
 */
async function fillInput(page, selector, text) {
  return Promise.all([
    await page.waitForSelector(selector),
    await page.focus(selector),
    await page.$eval(selector, el => el.setSelectionRange(0, el.value.length)),
    await page.keyboard.press('Backspace'),
    await page.keyboard.type(text)
  ]);
}

module.exports.getPage = getPage;
module.exports.fillInput = fillInput;