var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  initializing: function() {
    this.config.save();
  },
  prompting: function() {
    var done = this.async();
    this.prompt({
      type     : "input",
      name     : "username",
      message  : "Enter default T1 username: "
    }, function(answers) {
      this.username = answers.username;
      this.prompt({
        type      : "input",
        name      : "password",
        message   : "Enter default T1 password: "
      }, function(answers) {
        this.password = answers.password;
        this.prompt({
          type    : "input",
          name    : "baseAddress",
          message : "Enter base server address or base URL: "
        }, function(answers) {
          this.baseAddress = answers.baseAddress;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  writing: function() {
    this.fs.copyTpl(
        this.templatePath("./test-buddies/"),
        this.destinationPath("./test-buddies/")
        );
    this.fs.copyTpl(
        this.templatePath("./test/"),
        this.destinationPath("./test/"),
        {
          baseAddress: this.baseAddress,
          username: this.username,
          password: this.password
        }
        );
    this.fs.copy(
        this.templatePath("./chromedriver"),
        this.destinationPath("./chromedriver")
        );
    this.fs.copy(
        this.templatePath("./package.json"),
        this.destinationPath("./package.json")
        );
  },
  install: function() {
    this.npmInstall();
  }
});
