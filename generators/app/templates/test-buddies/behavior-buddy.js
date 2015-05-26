var behaviorBuddy = {};
var arraysIdentical = function(a, b) {
  var i = a.length;
  if (i != b.length) return false;
  while (i--) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

behaviorBuddy.ITEM_CLASS_NAME = "name";
behaviorBuddy.CAMPAIGNS = "Campaigns";
behaviorBuddy.EVENT_PIXELS = "Event Pixels";
behaviorBuddy.CLICK = "Click";
behaviorBuddy.IMPRESSION = "Impression";


behaviorBuddy.initialize = function(browser, webdriver) {
  behaviorBuddy.browser = browser;
  behaviorBuddy.webdriver = webdriver;
};

behaviorBuddy.selectItem = function(stringToSelect) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  var elements = browser.findElements(webdriver.By.className("name")).then(function(elements) {
    setTimeout(function() {
      var asyncCatcher = 0;
      for(var i = 0; i < elements.length; i++) {
        elements[i].getText().then(function(text) {
          if(text == stringToSelect) {
            elements[asyncCatcher].click();
          }
          asyncCatcher++;
        });
      }
    }, 1500);
  });
};

behaviorBuddy.selectItems = function(arrayOfStringsToBeSelected) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  browser.findElements(webdriver.By.className(behaviorBuddy.ITEM_CLASS_NAME)).then(function(elements) {
    setTimeout(function () {
      var asyncCatcher = 0;
      for(var i = 0; i < elements.length; i++) {
        elements[i].getText().then(function(text) {
          if(arrayOfStringsToBeSelected.indexOf(text)>=0) {
            elements[asyncCatcher].click();
          }
          asyncCatcher++;
        });
      }
    }, 1500);
  });
};

behaviorBuddy.allBehaviorsAdded = function(arrayOfExpectedBehaviors, elements) {
  var DEFAULT_BLANKS = 2;
  var segmentBehaviors = [];
  for(var i = 0; i < elements.length - DEFAULT_BLANKS; i++) {
    elements[i].getText().then(function(text) {
      var index = text.indexOf("\n");
      var pixelNameSubstring = text.substring(index+1);
      segmentBehaviors.push(pixelNameSubstring);
    });
  }
  setTimeout(function() {
    return arraysIdentical(segmentBehaviors, arrayOfExpectedBehaviors);
  }, 1000);
};

behaviorBuddy.editBehavior = function(behaviorToEdit) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  var asyncCatcher = 0;
  browser.findElements(webdriver.By.className("segment-element")).then(function(elements) {
    for(var i = 0; i < elements.length; i++) {
      elements[i].getAttribute("title").then(function(title) {
        if(title.indexOf(behaviorToEdit)>=0) {
          elements[asyncCatcher].findElement(webdriver.By.className("edit-control")).click();
        }
        asyncCatcher++;
      });
    }
  });
};

behaviorBuddy.selectFromDropdown = function (dropdown, stringToSelect) {
  var webdriver = behaviorBuddy.webdriver;
  dropdown.click().then(function () {
    setTimeout(function() {
      dropdown.findElements(webdriver.By.css(" * ")).then(function(elements) {
        var asyncCatcher = 0;
        for(var i = 0;i < elements.length; i++) {
          elements[i].getText().then(function(text) {
            if(text == stringToSelect){
              elements[asyncCatcher].click();
            }
            asyncCatcher++;
          });
        }
      });
    }, 1000);
  });
};

behaviorBuddy.addBehavior = function() {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.browser.findElement(webdriver.By.className("add-behavior-text")).click();
};

behaviorBuddy.addEventPixel = function(pixelToAdd, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.EVENT_PIXELS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItem(pixelToAdd);
  }, 4500);
  setTimeout(function() {
    browserBuddy.saveBehavior();
  }, 7000);
};

behaviorBuddy.addEventPixels = function(arrayOfPixelsToAdd, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.EVENT_PIXELS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItems(arrayOfPixelsToAdd);
  }, 4500);
  setTimeout(function() {
    behaviorBuddy.saveBehavior();
  }, 7000);
};

behaviorBuddy.addCampaignClick = function(campaignName, strategyName, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.CAMPAIGNS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItem(campaignName);
  }, 4500);
  setTimeout(function() {
    behaviorBuddy.selectItem(strategyName);
  }, 6500);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.CLICK);
  }, 8500);
  setTimeout(function() {
    behaviorBuddy.saveBehavior();
  }, 10500);
};

behaviorBuddy.addCampaignImpression = function(campaignName, strategyName, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.CAMPAIGNS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItem(campaignName);
  }, 4500);
  setTimeout(function() {
    behaviorBuddy.selectItem(strategyName);
  }, 6500);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.IMPRESSION);
  }, 8500);
  setTimeout(function() {
    behaviorBuddy.saveBehavior();
  }, 10500);
};

behaviorBuddy.addCampaignImpressions = function(arrayOfCampaignNames, arrayOfStrategyNames, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.CAMPAIGNS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItems(arrayOfCampaignNames);
  }, 4500);
  setTimeout(function() {
    behaviorBuddy.selectItems(arrayOfStrategyNames);
  }, 7000);
  setTimeout(function () {
    behaviorBuddy.selectItems(behaviorBuddy.IMPRESSION);
  }, 9000);
  setTimeout(function() {
    behaviorBuddy.saveBehavior();
  }, 11500);
};

behaviorBuddy.addCampaignClicks = function(arrayOfCampaignNames, arrayOfStrategyNames, advertiserName) {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  behaviorBuddy.addBehavior();
  behaviorBuddy.selectItem(advertiserName);
  setTimeout(function() {
    behaviorBuddy.selectItem(behaviorBuddy.CAMPAIGNS);
  }, 2500);
  setTimeout(function() {
    behaviorBuddy.selectItems(arrayOfCampaignNames);
  }, 4500);
  setTimeout(function() {
    behaviorBuddy.selectItems(arrayOfStrategyNames);
  }, 7000);
  setTimeout(function () {
    behaviorBuddy.selectItems(behaviorBuddy.CLICK);
  }, 9000);
  setTimeout(function() {
    behaviorBuddy.saveBehavior();
  }, 11500);
};


behaviorBuddy.saveBehavior = function() {
  var browser = behaviorBuddy.browser;
  var webdriver = behaviorBuddy.webdriver;
  browser.findElement(webdriver.By.id("add-button")).click();
};

module.exports = behaviorBuddy;
