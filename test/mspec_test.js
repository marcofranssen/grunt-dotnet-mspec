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

exports.mspec = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  report: function(test) {
    test.expect(3);

    var index_html_exists = grunt.file.exists('reports/mspec/index.html');
    var index_xml_exists = grunt.file.exists('reports/mspec/index.xml');
    var myspecs_html_exists = grunt.file.exists('reports/mspec/MySpecs.html');
    test.ok(index_html_exists, 'reports/mspec/index.html should exist');
    test.ok(index_xml_exists, 'reports/mspec/index.xml should exist');
    test.ok(myspecs_html_exists, 'reports/mspec/MySpecs.html should exist');

    test.done();
  },
};
