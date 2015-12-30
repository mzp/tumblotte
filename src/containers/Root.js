// @if DEBUG=false
module.exports = require('./Root.prod');
// @endif

// @if DEBUG=true
module.exports = require('./Root.dev');
// @endif
