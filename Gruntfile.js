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
      defaultConfig: {
        files: {
          'tmp': 'test/fixtures'
        }
      },
      customEnvironments: {
        options: {
          environments: ['qa']
        },
        files: {
          'tmp-qa': [ 'test/fixtures' ]
        }
      },
      nonExistentFiles: {
        options: {
          environments: ['staging']
        },
        files: {
          'tmp-empty': [ 'test/fixtures' ]
        }
      },
      specifyInline: {
        options: {
          environments: 'custom'
        },
        dest: 'tmp-specify-inline',
        src: 'test/fixtures',
        custom: {
          someModule: {
            optionA: 'A is OK',
            optionB: -10323.0123,
            optionC: false
          }
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
