loginBuddy = {};

loginBuddy.login = function(webdriver, browser, username, password, serverAddress) {
    var config = require("../test/config.js");
  if(username === "" || password === "") {
    var username = config.login;
    var password = config.password;
  }
  if(serverAddress == "") {
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
