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
          this.prompt({
            type      : "input",
            name      : "serverAddress",
            message   : "Enter server address (useful for PRs), leave blank for default"
          }, function(answers) {
            this.serverAddress = answers.serverAddress;
            this.prompt({
              type      : "input",
              name      : "advertiser",
              message   : "Advertiser to use for test: ",
              store     : true
            }, function(answers) {
              this.advertiser = answers.advertiser;
              this.prompt({
                type    : "input",
                name    : "segmentName",
                message : "Name for segment: "
              }, function(answers) {
                this.segmentName = answers.segmentName;
                this.prompt({
                  type  : "input",
                  name  : "mochaTimeout",
                  message : "Enter Mocha timeout: ",
                  store   : true
                }, function(answers) {
                  this.mochaTimeout = answers.mochaTimeout;
                  done();
                }.bind(this));
              }.bind(this));
            }.bind(this));
          }.bind(this));
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
          ticketName: this.ticketName,
          serverAddress: this.serverAddress;
          advertiser: this.advertiser,
          segmentName: this.segmentName
        }
        );
    this.fs.copyTpl(
        this.templatePath("./mocha.opts"),
        this.destinationPath("./test/mocha.opts"),
        {
          mochaTimeout: this.mochaTimeout
        }
        );
  }
});
