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
    }


    ,{
    name: 'nameSpace',
    message: 'Unique name-space for the project (alphanumeric)?',
    default: function( answers ) {
        return answers.siteName.replace(/\W/g, '').toLowerCase();
      }
    }

    ,{
    type: 'list',
    name: 'whichReset',
    message: 'Which reset would you like to use?',
    choices: ['reset','normalize', 'none']
    }


    ];

    this.prompt(prompts, function (props) {
      this.siteName = props.siteName;
      this.nameSpace = props.nameSpace;
      this.whichReset = props.whichReset;


      if (props.whichReset == "normalize" ) {
          this.whichReset = "@import 'core/normalize';";
      } else if (props.whichReset == "reset") {
          this.whichReset = "@import 'core/reset';";
      } else {
          this.whichReset = "";
      }
 



      done();
    }.bind(this));
  },

  app: function () {
    var context = { 
        site_name: this.siteName,
        site_nameSpace: this.nameSpace,
        css_reset: this.whichReset
    };

    //make folder for the task runners
    this.mkdir('tasks');

    //make folderd for the content
    this.mkdir('dist');
    this.mkdir('dev');
    this.mkdir('dev/src');

    //make the static folder
    this.mkdir('dev/static');

    //copy framework/base js across
    this.directory('frameworks/js', 'dev/static/js');

    //build sass dirs so I can process templates
    this.directory('frameworks/scss/modules', 'dev/src/scss/modules');
    this.directory('frameworks/scss/core', 'dev/src/scss/core');
    this.directory('frameworks/scss/constructors', 'dev/src/scss/constructors');
    
    this.template('frameworks/scss/_variables.scss', 'dev/src/scss/_variables.scss', context);
    this.template('frameworks/scss/style.scss', 'dev/src/scss/style.scss', context);

    

    
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