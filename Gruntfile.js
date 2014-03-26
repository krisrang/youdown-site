module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      build: {
        options: {
          cssDir: 'css'
        },
        files: {
          'css/app.css': 'css/app.scss'
        }
      }
    },
    jade: {
      build: {
        options: {
          data: {
            debug: false,
            livereload: false
          }
        },
        files: {
          "index.html": ["templates/*.jade"]
        }
      }
    },
    watch: {
      sass: {
        files: ['css/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ["js/**/*.js"],
        tasks: [],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/*.css'],
        options: { livereload: true }
      },
      html: {
        files: ["templates/**/*.jade"],
        tasks: ['jade'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['css/**', 'js/**'],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
              PORT: 5000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon'],
        options: {
            logConcurrentOutput: true
        }
      },
      assets: {
        tasks: ['compass', 'jade'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['concurrent:assets', 'concurrent:dev']);
  grunt.registerTask('build', ['concurrent:assets']);
};