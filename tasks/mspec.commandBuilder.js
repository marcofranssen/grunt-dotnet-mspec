'use strict';

module.exports.commandBuilder = function(grunt, files, options) {
    var mspec = options.platform === 'x86' ? 'mspec-x86-clr4.exe' : 'mspec-clr4.exe';
    if (options.toolsPath) {
      if (!grunt.file.isPathAbsolute(options.toolsPath)) {
        options.toolsPath = path.join(process.cwd(), options.toolsPath);
      }
      mspec = path.join(options.toolsPath, mspec);
    }
    mspec = mspec.replace(/\\/g, path.sep);
    var assemblies = files.map(function(file) {
      return '"' + file.src + '"';
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
      args.unshift('"' + path.join(filePath, 'index.xml') + '"');
      args.unshift('--xml');
      args.unshift('"' + filePath + '"');
      args.unshift('--html');
    }

    return {
      path: path.normalize(mspec),
      args: args
    };
  };