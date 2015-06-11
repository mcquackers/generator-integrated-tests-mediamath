var browserBuddy = {};

browserBuddy.createBrowser = function(webdriver, implicitWaitTime) {
  if(implicitWaitTime === undefined) {
    implicitWaitTime = 15000;
  }
  var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
  implicitWaitTime = implicitWaitTime || 15000;
  browser.manage().timeouts().implicitlyWait(implicitWaitTime);
  return browser;
};

module.exports = browserBuddy;
