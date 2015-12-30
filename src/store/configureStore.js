// @if DEBUG=false
module.exports = require('./configureStore.prod');
// @endif

// @if DEBUG=true
module.exports = require('./configureStore.dev');
// @endif
