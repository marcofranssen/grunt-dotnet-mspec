# grunt-dotnet-mspec

> Grunt plugin to run Machine.Specfication tests

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dotnet-mspec --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dotnet-mspec');
```

## The "mspec" task

### Overview
In your project's Gruntfile, add a section named `mspec` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mspec: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.toolsPath
Type: `String`
Default value: ``

A string value pointing to the mspec tools folder (this folder should contain the mspec-clr4.exe etc.).

#### options.output
Type: `String`
Default value: `reports/mspec`

A string value pointing to the folder where the reports should be generated.

#### options.timeinfo
Type: `Boolean`
Default value: `true`

A boolean value indicating if time related info should be shown in the html report.

#### options.silent
Type: `Boolean`
Default value: `false`

A boolean value indicating if progress should be suppressed (only print fatal errors, failures and summary).

#### options.progress
Type: `Boolean`
Default value: `false`

A boolean value indicating if progress should be shown as dotted output.

#### options.platform
Type: `String`
Default value: `anycpu`
Possible values: `anycpu|x86`

A string value indicating what platform to use for running the tests

### Usage Examples

The toolsPath in this example points to the mspec nuget package tools folder. The report will be stored in the reports folder relative to your grunt file. The specs target will execute all dll's ending with `Spec.dll` located in all `bin/Debug` folders within the `test/src` folder. 

```js
grunt.initConfig({
  mspec: {
    options: {
      toolsPath: 'test/src/packages/Machine.Specifications.0.6.2/tools',
      output: 'reports/mspec'
    },
    specs: {
      src: ['test/src/**/bin/Debug/*Specs.dll']
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
