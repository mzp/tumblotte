// add src/ directory to require path
require('app-module-path').addPath(__dirname + '/../src/');

// setup chai-enzyme
require('chai').use(require('chai-enzyme')());
