/*
 * grunt-konphyg
 * https://github.com/matmar10/grunt-konphyg
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'tmp-qa', 'tmp-empty']
    },

    // Configuration to be run (and then tested).
    konphyg: {
      options: {
        output: 'tmp',
        src: 'test/fixtures'
      },
      defaultConfig: {},
      customEnvironments: {
        options: {
          output: 'tmp-qa',
          src: 'test/fixtures',
          environments: ['qa']
        }
      },
      nonExistentFiles: {
        options: {
          output: 'tmp-empty',
          src: 'test/fixtures',
          environments: ['staging']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Create builds for release
    release: {
      options: {}
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'konphyg', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
