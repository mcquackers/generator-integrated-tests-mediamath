var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  initializing: function() {
    // generators.npmInstall();
    this.config.save();
  },
  writing: function() {
    console.log(this.templatePath());
    this.fs.copyTpl(
      this.templatePath("./test-buddies/"),
      this.destinationPath("./test-buddies/")
    );
    this.fs.copyTpl(
      this.templatePath("./test/"),
      this.destinationPath("./test/")
    );
  }
});
