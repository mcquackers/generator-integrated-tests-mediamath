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
          name    : "serverAddress",
          message : "Enter server address: "
        }, function(answers) {
          this.serverAddress = answers.serverAddress;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  writing: function() {
    this.fs.copyTpl(
        this.templatePath("./test-buddies/"),
        this.destinationPath("./test-buddies/"),
        {
          username: this.username,
          password: this.password,
        }
        );
    this.fs.copyTpl(
        this.templatePath("./test/"),
        this.destinationPath("./test/"),
        {
          serverAddress: this.serverAddress
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
