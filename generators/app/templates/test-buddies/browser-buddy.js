var browserBuddy = {};

browserBuddy.createBrowser = function(webdriver, implicitWaitTime) {
  browserBuddy.webdriver = webdriver;
  if(implicitWaitTime === undefined) {
    implicitWaitTime = 15000;
  }
  var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
  implicitWaitTime = implicitWaitTime || 15000;
  browser.manage().timeouts().implicitlyWait(implicitWaitTime);
  browserBuddy.browser = browser;
  return browser;
};

browserBuddy.changeOrganization = function(orgName) {
  var webdriver = browserBuddy.webdriver;
  var browser = browserBuddy.browser;
  var setOrgPromise = new Promise(function(resolveSetOrg, rejectSetOrg) {
    var orgTitle = browser.findElement(webdriver.By.className("org-name"));
    orgTitle.getText().then(function(text) {
      if(text!=orgName) {
        orgTitle.click().
          then(function() {
            return browser.findElement(webdriver.By.xpath("//*[@id='lo-6']/div/div/div[2]/div[1]/input"));
          }).
        then(function(element) {
          return element.sendKeys(orgName);
        }).
        then(function() {
          return browser.findElement(webdriver.By.partialLinkText(orgName)).click();
        }).
        then(function() {
          resolveSetOrg(true);
        }, function(err) {
          rejectSetOrg(err);
        });
      } else {
        resolveSetOrg(true);
      }
    });
  });
  return setOrgPromise;
});
module.exports = browserBuddy;
