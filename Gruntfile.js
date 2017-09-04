'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      unzip: ['modules'],
      modules: ['example/modules'],
      app: ['example/build']
    },

    titaniumifier: {
      module: {
        src: '.',
        dest: './dist'
      }
    },

    titanium: {
      ios: {
        options: {
          command: 'build',
          logLevel: 'debug',
          projectDir: './example',
          platform: 'ios'
        }
      }
    },

    unzip: {
      module: {
        src: 'nl.fokkezb.html2as-commonjs-<%= pkg.version %>.zip',
        dest: 'example'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titaniumifier');
  grunt.loadNpmTasks('grunt-titanium');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('build', ['titaniumifier:module']);
  grunt.registerTask('update', ['unzip:module']);
  grunt.registerTask('test', ['update', 'titanium:ios', 'clean:unzip']);

  grunt.registerTask('ios', ['clean', 'build', 'test']);

  grunt.registerTask('default', ['ios']);
};
