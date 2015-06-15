"use strict";
var should = require("chai").should();
var webdriver = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var advertiserSearchKey = "<%= advertiser %>";
var segmentName = "<%= segmentName %>";
var WAIT_TIME = 15000;
var browser;
var loginBuddy;
var behaviorBuddy;
var segmentBuddy;
// SET THESE VARIABLES BEFORE TESTING
var pixelsToSelect = [];

test.describe("<%= ticketName %>", function() {
  test.before("Open browser and login", function(done) {
    browser = require("../test-buddies/browser-buddy.js").
      createBrowser(webdriver, WAIT_TIME);
    loginBuddy = require("../test-buddies/login-buddy.js");
    behaviorBuddy = require("../test-buddies/behavior-buddy.js");
    segmentBuddy = require("../test-buddies/segment-buddy.js");
    behaviorBuddy.initialize(browser, webdriver);
    segmentBuddy.initialize(browser,webdriver);
    loginBuddy.login(webdriver, browser, "<%= username %>", "<%= password %>", "<%= serverAddress %>");
    browser.findElement(webdriver.By.className("nav-icon-segments")).click();
    done();
  })

  after("Close Browser", function() {
    browser.quit();
  })

  // test.it("begin test steps here", function() {
  // })
});
