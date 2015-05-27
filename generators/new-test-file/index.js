var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt({
      type     : "input",
      name     : "username",
      message  : "Enter T1 username: ",
      default  : undefined
    }, function(answers) {
      this.username = answers.username;
      this.prompt({
        type      : "input",
        name      : "password",
        message   : "Enter T1 password: ",
        default   : undefined
      }, function(answers) {
        this.password = answers.password;
        this.prompt({
          type    : "input",
          name    : "ticketName",
          message : "Enter Ticket Name: "
        }, function(answers) {
          this.ticketName = answers.ticketName;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  writing: function() {
    this.fs.copyTpl(
        this.templatePath("./test-file.js"),
        this.destinationPath("./test/"+this.ticketName+".js"),
        {
          username: this.username,
          password: this.password,
          ticketName: this.ticketName
        }
      );
  }
});
