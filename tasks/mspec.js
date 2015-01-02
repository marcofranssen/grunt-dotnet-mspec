/*
 * grunt-dotnet-mspec
 * https://github.com/marcofranssen/grunt-dotnet-mspec
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

var path          = require('path'),
    log           = require('../lib/mspec.log'),
    Command       = require('../lib/mspec.command'),
    name          = 'mspec',
    description   = 'Grunt plugin to run Machine.Specfication tests',
    buildCommand  = function(grunt, files, options) {

      var mspec = options.platform === 'x86' ? 'mspec-x86-clr4.exe' : 'mspec-clr4.exe';
      if (options.toolsPath) {
        if (!grunt.file.isPathAbsolute(options.toolsPath)) {
          options.toolsPath = path.join(process.cwd(), options.toolsPath);
        }
        mspec = path.join(options.toolsPath, mspec);
      }
      mspec = mspec.replace(/\\/g, path.sep);
      var assemblies = files.map(function(file) {
        return file.src;
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

  grunt.registerMultiTask(name, description, function() {

    var options = this.options({
                    platform: 'anycpu',
                    timeinfo: true,
                    output: 'reports/mspec'});
    var files = this.files;
    var taskComplete = this.async();

    var command = new Command(grunt, files, options);

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
