var assert = require('assert'),
    grunt = require('grunt'),
    Command = require('../tasks/mspec.command');

    var options = { platform: 'anycpu' };
    var oneSpecFile = [{ src: ['Spec.dll'] }];
    var twoSpecFiles = [{ src: ['SpecOne.dll' , 'SpecTwo.dll'] }];

describe('MSpec parameter handling', function() {
  
  describe('If ONE *.dll is passed to grunt-dotnet-mspec', function(){

    it('should grep this ONE', function() {
      var command = new Command(grunt, oneSpecFile, options);

      assert.equal(command.args[0], '"Spec.dll"');
    });
  });

  describe('If TWO *.dlls are passed to grunt-dotnet-mspec', function(){

    it('should grep these TWO', function(){
      var command = new Command(grunt, twoSpecFiles, options);
      
      assert.equal(command.args.length, 2);
      assert.equal(command.args[0], '"SpecOne.dll"');
      assert.equal(command.args[1], '"SpecTwo.dll"');
    });
  });
});
