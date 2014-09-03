var assert = require('should'),
    grunt = require('grunt'),
    Command = require('../lib/mspec.command');

    var options = { platform: 'anycpu' };
    var oneSpecFile = [{ src: ['Spec.dll'] }];
    var twoSpecFiles = [{ src: ['SpecOne.dll' , 'SpecTwo.dll'] }];

describe('MSpec parameter handling', function() {
  
  describe('If ONE *.dll is passed to grunt-dotnet-mspec', function(){

    it('should grep this ONE', function() {
      var command = new Command(grunt, oneSpecFile, options);

      command.args[0].should.equal('"Spec.dll"');
    });
  });

  describe('If TWO *.dlls are passed to grunt-dotnet-mspec', function(){

    it('should grep these TWO', function(){
      var command = new Command(grunt, twoSpecFiles, options);
      
      command.args.should.have.length(2);
      command.args[0].should.equal('"SpecOne.dll"');
      command.args[1].should.equal('"SpecTwo.dll"');
    });
  });
});
