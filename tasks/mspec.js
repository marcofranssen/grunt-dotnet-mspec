/*
 * grunt-dotnet-mspec
 * https://github.com/marcofranssen/grunt-dotnet-mspec
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

var Command = require('../lib/mspec.command'),
    name = 'mspec',
    description = 'Grunt plugin to run Machine.Specfication tests';

module.exports = function(grunt) {

  grunt.registerMultiTask(name, description, mspec);

  var mspec = function() {

    var options = this.options({
      platform: 'anycpu',
      timeinfo: true,
      output: 'reports/mspec'
    }),
      files = this.files,
      taskComplete = this.async();
    var command = new Command(grunt, files, options);

    console.log();
    console.log('mspec test runner');
    console.log();
    console.log(command.path + ' ' + command.args.join(' '));
    console.log();

    var log = function(message) {
      console.log(message.toString('utf8'));
    };
    var mspecProcess = grunt.util.spawn({
      cmd: command.path,
      args: command.args,
      opts: {
        windowsVerbatimArguments: true
      }
    }, function(err, result, code) {
      if (code > 0) {
        grunt.fail.fatal('Tests failed');
      }
      String(result);
      taskComplete(code === 0);
    });

    mspecProcess.stdout.on('data', log);
    mspecProcess.stderr.on('data', log);
    mspecProcess.on('error', function(err) {
      grunt.fail.fatal(err.code === 'ENOENT' ? 'Unable to find the mspec executable located at "' + command.path + '".' : err.message);
    });
  };

};