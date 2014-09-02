var assert = require('assert'),
    grunt = require('grunt'),
    mspec = require('../tasks/mspec.js');

describe('MSpec parameter handling', function(){
  before(function(){
    var options = {};
    var oneSpecFile = { 'Spec.dll' };
    var twoSpecFiles = { 'Specs.dll', 'SpecsTwo.dll' };
  });

  describe('If ONE *.dll is passed to grunt-dotnet-mspec', function(){
    it('should grep this ONE', function(){
      mspec.buildCommand();
    });
  });

  describe('If TWO *.dll is passed to grunt-dotnet-mspec', function(){
    it('should grep this TWO', function(){

    });
  });
});
