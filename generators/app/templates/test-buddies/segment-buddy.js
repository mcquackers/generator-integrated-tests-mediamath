var Q = require("q");
segmentBuddy = {};

segmentBuddy.initialize = function(browser, webdriver) {
  segmentBuddy.browser = browser;
  segmentBuddy.webdriver = webdriver;
};

segmentBuddy.setSegmentName = function(segmentName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var promise = new Promise(function(resolve, reject) {
    var segmentNameInput;
    segmentNameInput = browser.findElement(webdriver.By.id("segment-name-wc"));
    segmentNameInput.click().
      then(function() {
        return segmentNameInput.sendKeys(segmentName);
      }).then(function() {
        resolve(true);
      });
  });
  return promise;
};

segmentBuddy.setAdvertiser = function(advertiserName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var elementHold;
  console.log("In setAdvertiser");
  browser.findElement(webdriver.By.xpath("//*[@id='advertisers']")).
    then(function(element) {
      console.log("Found element");
      var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log("About to click!");
          element.click().then(function() {
            resolve(true);
          }, function(err) {
            console.log("Oh no!");
            reject(err);
          });
        }, 1500);
      });
      return promise;
    }).then(function() {
      return browser.findElement(webdriver.By.xpath("//*[@id='advertisers']/mm-input"));
    }).
  then(function(element) {
    elementHold = element;
    return element.click();
  }).
  then(function() {
    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        elementHold.sendKeys(advertiserName);
        resolve(true);
      }, 1000);
    });
    return promise;
  }, function(err) {
    console.log(err);
  }).then(function() {
    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        browser.findElements(webdriver.By.xpath("//*[@id='advertisers']/mm-list-item")).then(function(elements) {
          var asyncCatcher = 0;
          for(var i = 0; i < elements.length; i++) {
            elements[i].getText().then(function(text) {
              console.log(asyncCatcher);
              console.log(text);
              if(text == advertiserName) {
                elements[asyncCatcher].click();
                resolve(true);
              } else if(asyncCatcher == elements.length) {
                reject(new Error("The advertiser Search key could not be found in the list"));
              } else {
                asyncCatcher++;
              }
            });
          }
        });
      }, 1000);
    });
    return promise;
  }).then(function(value) {
    console.log(value);
  });
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

segmentBuddy.addSegment = function() {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var promise = new Promise(function(resolve, reject) {
    browser.findElement(webdriver.By.id("add-segment")).then(function(element) {
      element.click();
      resolve(true);
    });
  });
  return promise;
};

segmentBuddy.newTestSegment = function(advertiserName, segmentName) {
  var browser = segmentBuddy.browser;
  var webdriver = segmentBuddy.webdriver;
  var promise = new Promise(function(resolve, reject) {
    segmentBuddy.addSegment().then(function() {
      console.log("setSegmentName");
      return segmentBuddy.setSegmentName(segmentName);
    }).
    then(function() {
      return segmentBuddy.setAdvertiser(advertiserName);
    }).
    then(function() {
      resolve(true);
    }, function(err) {
      reject(new Error("Something Went Wrong Oh No nononono"));
    });
  });
  return promise;
};

module.exports = segmentBuddy;
