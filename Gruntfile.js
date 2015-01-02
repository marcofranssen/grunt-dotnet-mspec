/*
 * grunt-dotnet-mspec
 * https://github.com/marcofranssen/grunt-dotnet-mspec
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/space included path', 'reports'],
    },

    // copy source tests files to path space included
    copy: {
      packageTool: {
        expand: true,
        flatten: true,
        src: ['test/src/packages/Machine.Specifications.0.6.2/tools/*'],
        dest: 'test/space included path/packages/Machine.Specifications.0.6.2/tools/'
      },
      testAssemblies: {
        expand: true,
        flatten: true,
        src: ['test/src/MySpecs/bin/Debug/*'],
        dest: 'test/space included path/src/MySpecs/bin/Debug/'
      }
    },

    // Configuration to be run (and then tested).
    mspec: {
      options: {
        toolsPath: 'test/src/packages/Machine.Specifications.0.6.2/tools',
        output: 'reports/mspec'
      },
      specs: {
        src: ['test/src/**/bin/Debug/*Specs.dll']
      },
      specs_space_path_included: {
        options: {
          toolsPath: 'test/space included path/packages/Machine.Specifications.0.6.2/tools/',
          output: 'reports space included path/mspec'
        },
        src: ['test/space included path/src/MySpecs/bin/Debug/*Specs.dll']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    // restore nuget package for test project
    shell: {
      nuget: {
        options: {
          stdout: true,
          execOptions: {
              cwd: 'test/src'
          }
        },
        command: 'nuget restore'
      }
    },

    // msbuild to build the test project
    msbuild: {
      src: ['test/**/*.csproj'],
      options: {
        projectConfiguration: 'Debug',
        targets: ['Clean', 'Rebuild'],
        stdout: true,
        maxCpuCount: 4,
        buildParameters: {
            WarningLevel: 4
        },
        verbosity: 'quiet'
    },

    mochaTest:{
  		testPosts:{
			options: {
				reporter: 'spec',
				timeout: 10000,
				clearRequireCache: false
			},
			src: [ 'test/*.specs.js' ]
  		}
  	}
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-msbuild');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  grunt.registerTask('test', ['clean', 'shell:nuget', 'msbuild', 'copy', 'mspec', 'nodeunit', 'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
