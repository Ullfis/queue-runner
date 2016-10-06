var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var _jasmine = new Jasmine();

var noop = function() {};

_jasmine.configureDefaultReporter({print: noop});
_jasmine.addReporter(new SpecReporter());
_jasmine.loadConfigFile('jasmine.json');
_jasmine.execute();
