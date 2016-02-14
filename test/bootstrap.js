// add src/ directory to require path
require('app-module-path').addPath(__dirname + '/../src/');

// setup chai-enzyme
var chai = require('chai');
chai.use(require('chai-enzyme')());
chai.use(require("chai-as-promised"));
