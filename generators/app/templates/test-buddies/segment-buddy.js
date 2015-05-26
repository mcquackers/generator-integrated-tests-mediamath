segmentBuddy = {};

segmentBuddy.initialize = function(browser, webdriver) {
  segmentBuddy.browser = browser;
  segmentBuddy.webdriver = webdriver;
};

segmentBuddy.setSegmentName = function(segmentName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var segmentNameInput = browser.findElement(
      webdriver.By.xpath("//*[@id='segment-name-wc']")
      );
  segmentNameInput.click();
  segmentNameInput.sendKeys(segmentName);
};

segmentBuddy.setAdvertiser = function(advertiserName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var dropDown = browser.
    findElement(webdriver.By.xpath("//*[@id='advertisers']"));
  setTimeout(function() {
    dropDown.click().then(function() {
      var searchBox = browser.findElement(webdriver.By.xpath("//*[@id='advertisers']/mm-input"));
      searchBox.click();
      searchBox.sendKeys(advertiserName);
      setTimeout(function() {
        browser.findElements(
            webdriver.By.xpath("//*[@id='advertisers']/mm-list-item")
            ).then(function(elements) {
          var asyncCatcher = 0;
          for(var i = 0;i < elements.length; i++) {
            elements[i].getText().then(function(text) {
              if(text == advertiserName){
                elements[asyncCatcher].click();
              }
              asyncCatcher++;
            });
          }
        });
      }, 2000);
    });
  }, 3000);
};

segmentBuddy.getSegmentSize = function () {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var refreshButton = browser.findElement(webdriver.By.id("refresh-button"));
  refreshButton.click();
  return setTimeout(function() {
    browser.findElement(webdriver.By.className("segment-size")).getText().then(function(text) {
      return text;
    });
  }, 3000);
};

segmentBuddy.exitSegment = function() {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  setTimeout(function() {
    browser.wait(function() {
      var saveButton = browser.findElement(webdriver.By.xpath("//*[@id='save-segment-button']"));
      return saveButton.isEnabled();
    }, 20000).then(function() {
      browser.findElement(webdriver.By.xpath("//*[@id='cancel-segment-button']")).click();
      browser.findElement(webdriver.By.xpath("//*[@id='unsaved-changes-continue-button']")).click();
    });
  }, 5000);
};

segmentBuddy.saveSegment = function() {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  browser.findElement(webdriver.By.id("save-segment-button")).click();
};

segmentBuddy.newTestSegment = function(advertiserName, segmentName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  browser.findElement(webdriver.By.id("add-segment")).click();
  browser.wait(function() {
    return browser.findElement(webdriver.By.id("advertisers")).isDisplayed();
  }, 1500).then(function() {
    segmentBuddy.setAdvertiser(advertiserName);
    setTimeout(function() {
      segmentBuddy.setSegmentName(segmentName);
    }, 2000);
  });
};

module.exports = segmentBuddy;
