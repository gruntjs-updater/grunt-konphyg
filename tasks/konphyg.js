/*
 * grunt-konphyg
 * https://github.com/matmar10/grunt-konphyg
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */
'use strict';

var changeCase = require('change-case');
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('konphyg', 'Grunt task to expand a single configuration file into files to be parsed by Konphyg', function() {

    function inputFilename(options, environment) {
      return path.join(options.src, environment + '.json');
    }

    // outputName = path.join(options.output, changeCase.paramCase(configBlock) + '.' + options.environments[i] + '.json');
    function outputFilename(options, module, environment) {

      var output = path.join(options.output, changeCase.paramCase(module));

      if (environment) {
        output += '.' + environment;
      }

      return output + '.json';
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options, config, configBlock, done, configBlockFile, file, i, outputName;

    options = this.options({
      environments: ['production', 'development', 'test'],
      output: 'config',
      indent: 2,
      src: 'config'
    });

    done = this.async();

    for (i = 0; i < options.environments.length; i++) {

      file = inputFilename(options, options.environments[i]);

      if (grunt.file.exists(file)) {
        grunt.verbose.writeln('Reading config for environment `' + options.environments[i] + '` from `' + file + '`');
        config = grunt.file.readJSON(file);
      } else {
        grunt.verbose.writeln('No config for environment `' + options.environments[i] + '` exists; no modules will be written for this environment');
        config = {};

        // need to make directory, since may not be created by the loop below
        if (!grunt.file.isDir(options.output)) {
          grunt.file.mkdir(options.output);
        }
      }

      for (configBlock in config) {
        if (!config.hasOwnProperty(configBlock)) {
          continue;
        }

        grunt.verbose.writeln('Processing configuration block `' + configBlock + '`');

        configBlockFile = outputFilename(options, configBlock);
        if (!grunt.file.exists(configBlockFile)) {
          grunt.verbose.writeln('No base configuration file exists for config block `' + configBlock + '`; creating it now');
          grunt.file.write(configBlockFile, '{}', null, options.indent);
        }

        outputName = outputFilename(options, configBlock, options.environments[i]);
        grunt.verbose.writeln('Writing output file to `' + outputName + '`');
        grunt.file.write(outputName, JSON.stringify(config[configBlock], null, options.indent));
      }
    }

    done();
  });

};
