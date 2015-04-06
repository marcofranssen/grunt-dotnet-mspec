/*
 * grunt-dotnet-mspec
 * https://github.com/marcofranssen/grunt-dotnet-mspec
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
  buildCommand = function(grunt, files, options) {
    var mspec = options.platform === 'x86' ? 'mspec-x86-clr4.exe' : 'mspec-clr4.exe';
    if (options.toolsPath) {
      if (!grunt.file.isPathAbsolute(options.toolsPath)) {
        options.toolsPath = path.join(process.cwd(), options.toolsPath);
      }
      mspec = path.join(options.toolsPath, mspec);
    }
    mspec = mspec.replace(/\\/g, path.sep);

    var assemblies = files[0].src.map(function(file) {
      return '"' + file + '"';
    });
    var args = assemblies;

    if (options.timeinfo) {
      args.unshift('-t');
    }
    if (options.silent) {
      args.unshift('-s');
    }
    if (options.progress) {
      args.unshift('-p');
    }
    if (options.output) {
      var filePath = path.join(process.cwd(), options.output);
      grunt.file.mkdir(filePath);
      args.unshift(path.join(filePath, 'index.xml'));
      args.unshift('--xml');
      args.unshift(filePath);
      args.unshift('--html');
    }

    return {
      path: path.normalize(mspec),
      args: args
    };
  };

module.exports = function(grunt) {

  grunt.registerMultiTask('mspec', 'Grunt plugin to run Machine.Specfication tests', function() {

    var options = this.options({
      platform: 'anycpu',
      timeinfo: true,
      output: 'reports/mspec'
    }),
      files = this.files,
      taskComplete = this.async();
    var command = buildCommand(grunt, files, options);

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
    }, function(err, result, code) {
      if (code > 0) {
        grunt.fail.fatal('Tests failed');
      }
      String(result);
      taskComplete(code === 0);
    });

    mspecProcess.stdout.on('data', log);
    mspecProcess.stderr.on('data', log);
    mspecProcess.on('error', function (err) {
      grunt.fail.fatal(err.code === 'ENOENT' ? 'Unable to find the mspec executable located at "' + command.path + '".' : err.message);
    });
  });

};
