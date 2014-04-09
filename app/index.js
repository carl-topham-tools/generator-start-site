'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var StartSiteGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    

    this.on('end', function () {
      process.chdir("tasks/");
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic StartSite generator.'));

    var prompts = [{
      name: 'siteName',
      message: 'What do you want to call your blog?'
    }];

    this.prompt(prompts, function (props) {
      this.siteName = props.siteName;

      done();
    }.bind(this));
  },

  app: function () {
    var context = { 
        site_name: this.siteName 
    };

    //make folder for the task runners
    this.mkdir('tasks');

    //make folderd for the content
    this.mkdir('dist');
    this.mkdir('dev');
    this.mkdir('dev/src');

    //copy framework across
    this.directory('frameworks/scss', 'dev/src/scss');

    //make the static folder
    this.mkdir('dev/static');

    
    this.template('_package.json', 'tasks/package.json', context);

    //bower setup
    this.template('_.bowerrc', 'tasks/.bowerrc', context);
    this.template('_bower.json', 'tasks/bower.json', context);


    //copy grunt setup
    this.template("_Gruntfile.js", "tasks/Gruntfile.js", context);
    


    //setup base html files
    this.template("_index.html", "dev/index.html", context);

  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = StartSiteGenerator;