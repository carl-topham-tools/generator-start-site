/* Generated for <%= site_name %> */

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //watch


        watch: {
          css: {
            files: '../dev/src/scss/**/*.scss',
            tasks: ['sass:dev', 'autoprefixer', 'notify:sassDone' ],
            options: {
              livereload: true,
            },
          },

        },


        // end watch

        //sass



        sass: {                              // Task
            dev: {                            // Target
              options: {                       // Target options
                style: 'expanded',
                sourcemap: true,
              },
              files: {                         // Dictionary of files
                '../dev/static/css/style.css': '../dev/src/scss/style.scss',
              }
            },
            dist: {                            // Target
              options: {                       // Target options
                style: 'expanded',
              },
              files: {                         // Dictionary of files
                '../dev/static/css/style.css': '../dev/src/scss/style.scss',
              }
            }
          },



        // end sass



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
              src: '../dev/static/css/style.css',
              dest: '../dev/static/css/style.css'
            }
          },


       //end auto prefixer


      //css min

      cssmin: {
        minify: {
          expand: true,
          cwd: '../dev/static/css',
          src: ['*.css', '!*.min.css'],
          dest: '../dist/static/css',
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
            src: ['../dev/static/css/style.css']
          }
        },







    //Dist production
    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['../dev/*.html'],
          dest: '../dist/',
          filter: 'isFile'
        }]
      }
    },

    'useminPrepare': {
      options: {
        dest: '../dist'
      },
      //html: '../dev/index.html'
      src: ['../dev/*.html'],
    },

    usemin: {
      //html: ['../dist/index.html']
      html : '../dist/*.html'
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


      sassDone: {
        options: {
          title: '🎉 Ta-da!!!' ,  // optional
          message: 'Sass has compiled successfully 😊', //required
        }
      },





    }


    });//end grunt package configs

    grunt.registerTask('dist', ['notify:distStart', 'useminPrepare', 'copy', 'concat', 'uglify', 'usemin', 'sass:dist', 'autoprefixer', 'cssmin', 'notify:distDone']);


    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', []);
    
};
