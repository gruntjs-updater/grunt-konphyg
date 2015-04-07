'use strict';

var grunt = require('grunt');

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
  default: function(test) {

    test.expect(3);

    var modules = [
      'module-a'
    ];

    var environments = [
      'development',
      'production',
      'test'
    ];

    var i, j, actual, expected;

    for (i = 0; i < modules.length; i++) {
      for (j = 0; j < environments.length; j++) {
        actual = grunt.file.read('tmp/'+ modules[i] + '.' + environments[j] + '.json');
        expected  = grunt.file.read('test/expected/' + modules[i] + '.' + environments[j] + '.json');
        test.equal(actual, expected, 'Configuration for module ' + modules[i] + ' is expanded for environment ' + environments[j]);
      }
    }

    test.done();
  }
};
