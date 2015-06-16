loginBuddy = {};

loginBuddy.login = function(webdriver, browser, username, password, serverAddress) {
  if(username === "" || password === "") {
    var username = "<%= username %>";
    var password = "<%= password %>";
  }
  if(serverAddress == "") {
    var config = require("../test/config.js");
    browser.get(config.serverAddress);
  } else {
    browser.get(serverAddress);
  }
  var usernameField = browser.findElement(webdriver.By.className("user-name"));
  var passwordField = browser.findElement(webdriver.By.className("password"));
  var submitButton = browser.findElement(webdriver.By.className("login-action"));
  usernameField.sendKeys(username);
  passwordField.sendKeys(password);
  submitButton.click();
};

module.exports = loginBuddy;
