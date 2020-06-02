const utils = require('./helpers/utils');
const selectedBrowser = require('./helpers/browser');
const append = require('./helpers/append');

(async () => {
  const browser = await selectedBrowser.getBrowser();
  const messages = [
    '✅ I want to see a list of establishments',
    '✅ I want to see all information of a establishment',
    '✅ I want to save a change of this establishment',
    '✅ I want to go back to list of establishment'
  ];

  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1200, height: 800 });

  const pageUrl = `http://localhost:4200`;
  await Promise.all([
    page.goto(pageUrl),
    page.waitForNavigation()
  ]);

  // Get last html content
  page = await utils.getPage(browser);


  
  // Message 1  --------------------------------------------------------------------------------------------
  // Append message
  await append.message(page, messages[0], 1200);

  // Sleep
  await page.waitFor(5000); // 5s



  // Message 2  --------------------------------------------------------------------------------------------
  // Establishment item
  const editEstablishment = 'body > app-root > main > section > app-establishments > div > div > app-list > app-card.card.bg-white.ng-tns-c2-3.ng-star-inserted > article > div > div:nth-child(1)';
  await page.waitForSelector(editEstablishment);
  await Promise.all([
    page.click(editEstablishment),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  // Get last html content
  page = await utils.getPage(browser);

  // Append message
  await append.message(page, messages[1], 1200);

  // Sleep
  await page.waitFor(4000); // 4s



  // Message 3  --------------------------------------------------------------------------------------------
  // Banks
  const banksSelect = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(3) > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix .mat-select';
  await page.waitForSelector(banksSelect);
  await page.click(banksSelect);
  const banksOption = '#cdk-overlay-0 > div > div > .mat-option';
  await page.waitForSelector(banksOption);
  await page.click(banksOption);

  // Account type
  const accountTypeSelect = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(3) > div:nth-child(2) > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix .mat-select';
  await page.waitForSelector(accountTypeSelect);
  await page.click(accountTypeSelect);
  const accountOption = '#cdk-overlay-1 > div > div > .mat-option';
  await page.waitForSelector(accountOption);
  await page.click(accountOption);

  // Document
  const documentInput = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(3) > div:nth-child(3) > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix input';
  await page.waitForSelector(documentInput);
  await page.click(documentInput);
  await page.keyboard.type('52897454679');

  // Agency
  const agencyInput = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(4) > div:nth-child(1) > mat-form-field.w-50.mat-form-field.ng-tns-c5-35.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex > div.mat-form-field-infix input';
  await page.waitForSelector(agencyInput);
  await page.click(agencyInput);
  await page.keyboard.type('0020');

  // Agency Digit
  const agencyDigitInput = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(4) > div:nth-child(1) > mat-form-field.w-25.ml-3.mat-form-field.ng-tns-c5-36.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex > div.mat-form-field-infix input';
  await page.waitForSelector(agencyDigitInput);
  await page.click(agencyDigitInput);
  await page.keyboard.type('2');

  // Account
  const accountInput = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(4) > div:nth-child(2) > mat-form-field.w-50.mat-form-field.ng-tns-c5-37.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex > div.mat-form-field-infix input';
  await page.waitForSelector(accountInput);
  await page.click(accountInput);
  await page.keyboard.type('20192');

  // Account Digit
  const accountDigitInput = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(4) > div:nth-child(2) > mat-form-field.w-25.ml-3.mat-form-field.ng-tns-c5-38.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex > div.mat-form-field-infix input';
  await page.waitForSelector(accountDigitInput);
  await page.click(accountDigitInput);
  await page.keyboard.type('4');

  // Withdrawal
  const automaticWithdrawal = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div:nth-child(4) > div:nth-child(3) > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix .mat-select';
  await page.waitForSelector(automaticWithdrawal);
  await page.click(automaticWithdrawal);
  const automaticWithdrawalOption = '#cdk-overlay-2 > div > div > .mat-option';
  await page.waitForSelector(automaticWithdrawalOption);
  await page.click(automaticWithdrawalOption);

  // Save Button
  const saveButton = 'body > app-root > main > section > app-details > div > form > div.row.mt-1.ml-3.mr-3.ng-trigger.ng-trigger-fade > div > div.row.pt-5.pb-1.mt-5.mb-4 > div > button';
  await page.waitForSelector(saveButton);
  await page.click(saveButton);

  // Append message
  await append.message(page, messages[2], 1200);

  // Sleep
  await page.waitFor(4000); // 4s



  // Message 4  --------------------------------------------------------------------------------------------
  // Go Back Button
  const goBackButton = 'body > app-root > main > section > app-details > div > form > div.details-header.ng-trigger.ng-trigger-fade > span > img';
  await page.waitForSelector(goBackButton);
  await page.click(goBackButton);

  // Append message
  await append.message(page, messages[3], 1200);

  // Sleep
  await page.waitFor(8000); // 8s

  await browser.close();
})();