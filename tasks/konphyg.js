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

  grunt.registerTask('konphyg', 'Grunt task to expand a single configuration file into files to be parsed by Konphyg', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options, config, configBlock, done, environments, file, i, outputName;

    options = this.options({
      environments: ['production', 'development', 'test'],
      output: 'config',
      indent: 2,
      src: 'config'
    });

    done = this.async();

    if (this.args[0]) {
      environments = [ this.args[0] ];
    } else {
      environments = options.environments;
    }

    for (i = 0; i < environments.length; i++) {

      file = path.join(options.src, environments[i] + '.json');
      grunt.verbose.writeln('Reading config for environment `' + environments[i] + '` from `' + file + '`');
      config = grunt.file.readJSON(file);

      for (configBlock in config) {
        if (!config.hasOwnProperty(configBlock)) {
          continue;
        }

        grunt.verbose.writeln('Processing configuration block `' + configBlock + '`');
        outputName = path.join(options.output, changeCase.paramCase(configBlock) + '.' + environments[i] + '.json');
        grunt.verbose.writeln('Writing output file to `' + outputName + '`');
        grunt.file.write(outputName, JSON.stringify(config[configBlock], null, options.indent));
      }
    }

    done();
  });

};
