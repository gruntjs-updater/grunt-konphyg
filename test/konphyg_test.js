'use strict';

var grunt = require('grunt');
var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.konphyg = {
  setUp: function(done) {
    done();
  },
  defaultConfig: function(test) {


    var modules = [
      'module-a'
    ];

    var environments = [
      'development',
      'production',
      'test'
    ];

    var i, j, actual, expected;

    test.expect(3 + environments.length);

    for (i = 0; i < modules.length; i++) {

      // default environment should exist for all modules
      test.ok(grunt.file.isDir('tmp/'));
      test.ok(grunt.file.exists('tmp/' + modules[i] + '.json'), 'Default module file should exist for all modules');
      test.equals(fs.readdirSync('tmp').length, 4, 'Only four files should be created for qa environment');

      for (j = 0; j < environments.length; j++) {
        actual = grunt.file.read('tmp/'+ modules[i] + '.' + environments[j] + '.json');
        expected  = grunt.file.read('test/expected/' + modules[i] + '.' + environments[j] + '.json');
        test.equal(actual, expected, 'Configuration for module ' + modules[i] + ' is expanded for environment ' + environments[j]);
      }
    }

    test.done();
  },

  customEnvironments: function (test) {

    var modules = [
      'module-b'
    ];

    var environments = [
      'qa'
    ];

    var i, j, actual, expected;

    test.expect(3 + environments.length);

    for (i = 0; i < modules.length; i++) {

      test.ok(grunt.file.isDir('tmp-qa/'));
      test.ok(grunt.file.exists('tmp-qa/' + modules[i] + '.json'), 'Default module file should exist for all modules');
      test.equals(fs.readdirSync('tmp-qa').length, 2, 'Only two files should be created for qa environment');

      for (j = 0; j < environments.length; j++) {
        actual = grunt.file.read('tmp-qa/'+ modules[i] + '.' + environments[j] + '.json');
        expected  = grunt.file.read('test/expected/' + modules[i] + '.' + environments[j] + '.json');
        test.equal(actual, expected, 'Configuration for module ' + modules[i] + ' is expanded for environment ' + environments[j]);
      }
    }
    test.done();
  },

  nonExistentFiles: function (test) {
    test.expect(1);
    test.ok(grunt.file.isDir('tmp-empty/'));

    test.done();
  },

  specifyInline: function (test) {
    var dir = 'tmp-specify-inline/';

    var modules = [
      'some-module'
    ];

    var environments = [
      'custom'
    ];

    var i, j, actual, expected;

    test.expect(3 + environments.length);

    for (i = 0; i < modules.length; i++) {

      test.ok(grunt.file.isDir(dir));
      test.ok(grunt.file.exists(dir + modules[i] + '.json'), 'Default module file should exist for all modules');
      test.equals(fs.readdirSync(dir).length, 2, 'Only two files should be created for qa environment');

      for (j = 0; j < environments.length; j++) {
        actual = grunt.file.read(dir + modules[i] + '.' + environments[j] + '.json');
        expected  = grunt.file.read('test/expected/' + modules[i] + '.' + environments[j] + '.json');
        test.equal(actual, expected, 'Configuration for module ' + modules[i] + ' is expanded for environment ' + environments[j]);
      }
    }
    test.done();
  }
};
