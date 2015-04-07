/*
 * grunt-konphyg
 * https://github.com/matmar10/grunt-konphyg
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */
'use strict';

var changeCase = require('change-case');
var merge = require('merge');
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('konphyg', 'Grunt task to expand a single configuration file into files to be parsed by Konphyg', function() {

    function inputFilename(src, environment) {
      return path.join(src, environment + '.json');
    }

    // outputName = path.join(options.dest, changeCase.paramCase(configBlock) + '.' + options.environments[i] + '.json');
    function outputFilename(dest, module, environment) {

      var output = path.join(dest, changeCase.paramCase(module));

      if (environment) {
        output += '.' + environment;
      }

      return output + '.json';
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options, config, configBlock, configBlockFile, done, file, i, outputName, task;

    options = this.options({
      environments: ['production', 'development', 'test'],
      indent: 2
    });

    if (!Array.isArray(options.environments)) {
      options.environments = [ String(options.environments) ];
    }

    task = this;
    done = this.async();

    // process each dest: src pair from config, e.g.
    // {
    //   files: {
    //     dest1: 'src1',
    //     dest2: 'src2'
    //   }
    // }
    // there usually will be only one iteration here
    this.files.forEach(function(srcDestPair) {

      // grunt expands this to is an array, but in reality it is likely to be just one path
      srcDestPair.src.forEach(function (srcPath) {

        grunt.verbose.writeln('Processing source path `' + srcPath + '`');

        // process each environment for all source paths
        for (i = 0; i < options.environments.length; i++) {

          file = inputFilename(srcPath, options.environments[i]);

          // read config for environment, if it exists
          if (grunt.file.exists(file)) {
            grunt.verbose.writeln('Reading config for environment `' + options.environments[i] + '` from `' + file + '`');
            config = grunt.file.readJSON(file);
          } else {
            grunt.verbose.writeln('No config for environment `' + options.environments[i] + '` exists; no modules will be written for this environment');
            config = {};

            // need to make directory, since may not be created by the loop below
            if (!grunt.file.isDir(srcDestPair.dest)) {
              grunt.file.mkdir(srcDestPair.dest);
            }
          }

          // merge inline config for environment, if it was specified
          if ('object' === typeof task.data[options.environments[i]]) {
            grunt.verbose.writeln('Found inline configuration block for environment `' + options.environments[i] + '`; merging it to the existing environment config');
            config = merge(config, task.data[options.environments[i]]);
          }

          grunt.verbose.writeln('Will now process configuration:', config);

          // process each config block for this environment
          for (configBlock in config) {
            if (!config.hasOwnProperty(configBlock)) {
              continue;
            }

            grunt.verbose.writeln('Processing configuration block `' + configBlock + '`');

            configBlockFile = outputFilename(srcDestPair.dest, configBlock);
            if (!grunt.file.exists(configBlockFile)) {
              grunt.verbose.writeln('No base configuration file exists for config block `' + configBlock + '`; creating it now');
              grunt.file.write(configBlockFile, '{}', null, options.indent);
            }

            outputName = outputFilename(srcDestPair.dest, configBlock, options.environments[i]);
            grunt.verbose.writeln('Writing output file to `' + outputName + '`');
            grunt.file.write(outputName, JSON.stringify(config[configBlock], null, options.indent));
          }
        }
      });
    });

    done();
  });

};
