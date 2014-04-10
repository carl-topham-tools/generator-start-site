'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

//['Beer', 'Cake', 'Tea', 'Coffee', 'Kittens', 'Puppies', 'Unicorns', 'Nyan Cat' , 'None of the above']
var choice_map = {
  'Beer': "🍺 mmmmm Beer!",
  'Cake': "🍰 Nom nom nom!",
  'Tea' : "☕️ Grab a brew!",
  'Coffee' : "☕️ Frappé-latté-chino time!",
  'Kittens' : "🐯 Purr!!",
  'Nyan Cat' : "🌈 Done Makin' rainbows!!",
}

var choice_list = [];

for (var key in choice_map) {
  if (choice_map.hasOwnProperty(key)) {
    choice_list.push(key);
  }
}

var StartSiteGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  
    this.on('end', function () {
      process.chdir(this.nameSpace+"/tasks/");
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
      message: 'What do you want to call your site?'
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

    ,{
    type: 'list',
    name: 'likes',
    message: 'Which is your favorite? (This is so important)',
    choices: choice_list
    }]
    
    this.prompt(prompts, function (props) {
      this.siteName = props.siteName;
      this.nameSpace = props.nameSpace;
//      this.whichReset = props.whichReset;


      if (props.whichReset == "normalize" ) {
          this.whichReset = "@import 'core/normalize';";
      } else if (props.whichReset == "reset") {
          this.whichReset = "@import 'core/reset';";
      } else {
          this.whichReset = "";
      }

      if (choice_map[props.likes] !== undefined) {
        this.likes = choice_map[props.likes];
      } else {
        this.likes = 'hello null';
      }


      done();
    }.bind(this));
  },

  app: function () {
    var context = { 
        site_name: this.siteName,
        site_nameSpace: this.nameSpace,
        css_reset: this.whichReset,
        like_text: this.likes
    };
    //make site folder
    this.mkdir(this.nameSpace);

    //make folder for the task runners
    this.mkdir(this.nameSpace+'/tasks');

    //make folders for the content
    this.mkdir(this.nameSpace+'/dist');
    this.mkdir(this.nameSpace+'/dev');
    this.mkdir(this.nameSpace+'/dev/src');

    //make the static folder
    this.mkdir(this.nameSpace+'/dev/static');

    //copy framework/base js across
    this.directory('frameworks/js', this.nameSpace+'/dev/static/js');

    //build sass dirs so I can process templates
    this.directory('frameworks/scss/modules', this.nameSpace+'/dev/src/scss/modules');
    this.directory('frameworks/scss/core', this.nameSpace+'/dev/src/scss/core');
    this.directory('frameworks/scss/constructors', this.nameSpace+'/dev/src/scss/constructors');
    
    this.template('frameworks/scss/_variables.scss', this.nameSpace+'/dev/src/scss/_variables.scss', context);
    this.template('frameworks/scss/style.scss', this.nameSpace+'/dev/src/scss/style.scss', context);

    

    
    this.template('_package.json', this.nameSpace+'/tasks/package.json', context);

    //bower setup
    this.template('_.bowerrc', this.nameSpace+'/tasks/.bowerrc', context);
    this.template('_bower.json', this.nameSpace+'/tasks/bower.json', context);


    //copy grunt setup
    this.template("_Gruntfile.js", this.nameSpace+"/tasks/Gruntfile.js", context);
    


    //setup base html files
    this.template("_index.html", this.nameSpace+"/dev/index.html", context);

  },

  projectfiles: function () {
    this.copy('editorconfig', this.nameSpace+'/.editorconfig');
    this.copy('jshintrc', this.nameSpace+'/.jshintrc');
  }
});

module.exports = StartSiteGenerator;