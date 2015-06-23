"use strict";
var should = require("chai").should();
var webdriver = require("selenium-webdriver");
var test = require("selenium-webdriver/testing");
var advertiserSearchKey = "<%= advertiser %>";
var segmentName = "<%= segmentName %>";
var WAIT_TIME = 15000;
var browser;
var loginBuddy;
var browserBudder;
var behaviorBuddy;
var segmentBuddy;
// SET THESE VARIABLES BEFORE TESTING
var pixelsToSelect = [];

test.describe("<%= ticketName %>", function() {
  test.before("Open browser and login", function(done) {
    browserBuddy = require("../test-buddies/browser-buddy.js");
    browser = browserBuddy.createBrowser(webdriver, WAIT_TIME);
    loginBuddy = require("../test-buddies/login-buddy.js");
    behaviorBuddy = require("../test-buddies/behavior-buddy.js");
    segmentBuddy = require("../test-buddies/segment-buddy.js");
    behaviorBuddy.initialize(browser, webdriver);
    segmentBuddy.initialize(browser,webdriver);
    loginBuddy.login(webdriver, browser, "<%= username %>", "<%= password %>", "<%= serverAddress %>");
    browser.setOrg("aperture").then(function() {
      return browser.findElement(webdriver.By.className("nav-icon-segments")).click();
    }).
    then(function() {
      done();
    });
  })

  after("Close Browser", function() {
    browser.quit();
  })

  // test.it("begin test steps here", function() {
  // })
});
