/* Generated for <%= site_name %> */

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //watch
        watch: {
          css: {
            files: 'frameworks/less/**/*.less',
            tasks: ['less:dev', 'autoprefixer', 'notify:lessDone' ],
            options: {
              livereload: true,
            },
          },
          html: {
            files: '**/*.html',
            options: {
              livereload: true,
            },
          },
          js: {
            files: 'frameworks/js/**/*.js',
            options: {
              livereload: true,
            },
          },
          jade: {
            files: 'frameworks/jade/**/*.jade',
            tasks: ['jade' ],
            options: {
              livereload: true,
            },
          },
        },
        // end watch

        //less
        less: {                              // Task
            dev: {                            // Target
              options: {                       // Target options
                style: 'expanded',
                sourcemap: true,
              },
              files: {                         // Dictionary of files
                'dev/static/css/style.css': 'frameworks/less/style.less',
              }
            },
            dist: {                            // Target
              options: {                       // Target options
                style: 'expanded',
              },
              files: {                         // Dictionary of files
                'dist/static/css/style.css': 'frameworks/less/style.less',
              }
            }
          },
        // end less

        //jade
        jade: {
          compile: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "frameworks/jade/",
              src: ['**/*.jade', '!**/_*.jade'], //ignore all _jade files
              dest: "dev",
              expand: true,
              ext: ".html"
            } ]
          }
        },
        //end jade

        //auto prefixer
        autoprefixer: {
          options: {
            browsers: ['last 8 version', 'ie 8', 'ie 7']
          },
          // just prefix the specified file
          single_file: {
            options: {
              // Target-specific options go here.
            },
            src: 'dev/static/css/style.css',
            dest: 'dev/static/css/style.css'
          }
        },
       //end auto prefixer

      //css min
      cssmin: {
        minify: {
          expand: true,
          cwd: 'dev/static/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/static/css',
          ext: '.css',
          report: 'gzip'
        }
      },
      // end ccs min

      //check using csscss - need right version of ruby!
      csscss: {
        options: {
          minMatch: 4,
          verbose: true,
          shorthand: false,
        },
        dist: {
          src: ['dev/static/css/style.css']
        }
      },

    //Dist production
    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['dev/*.html'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      }
    },

    'useminPrepare': {
      options: {
        dest: 'dist'
      },
      //html: '../dev/index.html'
      src: ['dev/*.html'],
    },

    usemin: {
      //html: ['../dist/index.html']
      html : 'dist/*.html'
    },
    // end Dist production  

    //notify
    notify: {
      done: {
        options: {
          title: 'Done!',  // optional
          message: 'Whatever you were doing is done!', //required
        }
      },
      distStart: {
        options: {
          title: '🎁 Prepping for distribution!',  // optional
          message: 'Get ready for the awesome...', //required
        }
      },
      distDone: {
        options: {
          title: "<%= like_text %>" ,  // optional
          message: "<%= site_name %> is ready to be distributed 👊", //needed escaping!
        }
      },
      lessDone: {
        options: {
          title: '🎉 Ta-da!!!' ,  // optional
          message: 'Less has compiled successfully 😊', //required
        }
      },
    }

  });//end grunt package configs

  grunt.registerTask('dist', ['notify:distStart', 'jade', 'useminPrepare', 'copy', 'concat', 'uglify', 'usemin', 'less:dist', 'autoprefixer', 'cssmin', 'notify:distDone']);

  // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', []);
    
};
