/**
 * Append message to browser
 * @param page: Page
 * @param message: text
 * @param timeout: number
 */
async function message(page, message, timeout) {
  const selector = "body";
  await page.addScriptTag({
    type: "text/javascript",
    content: `
      window.setTimeout(function() {
        var style = "position: fixed; z-index: 2; padding: 25px 25px 25px 25px; min-width: 400px; border-radius: 10px; background-position: 35px center; background-repeat: no-repeat; background-size: 24px; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 100px; color: #000; background-color: #fff; pointer-events: auto; left: 50%; margin-left: -275px; top: 50%; margin-top: -25px; text-transform: uppercase; font-family: monospace; font-weight: 100; font-size: 18px; ";
        var modal = document.createElement("div");
        modal.style = style;
        modal.id = "puppeteer_message";
        modal.innerText = "${message}";
        var target = document.querySelector("body main section");
        var local = target.parentNode;
        local.insertBefore(modal, target);
        window.setTimeout(function(){
          var elem = document.querySelector('#puppeteer_message');
          elem.parentNode.removeChild(elem);
        }, 3000);
      }, ${timeout});
    `
  });

  return Promise.all([
    await page.waitForSelector(selector),
    await page.focus(selector)
  ]);
}

module.exports.message = message;