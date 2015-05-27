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
        done();
      }.bind(this));
    }.bind(this));
  },
  writing: function() {
    console.log(this.templatePath());
    this.fs.copyTpl(
        this.templatePath("./test-buddies/"),
        this.destinationPath("./test-buddies/"),
        {
          username: this.username,
          password: this.password
        });
  }
});
