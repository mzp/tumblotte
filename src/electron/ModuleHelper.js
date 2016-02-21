var nodeRequire = require;

exports.nodeRequire = nodeRequire;

exports.remoteRequire = function(name) {
  if(process.type == 'browser') {
    return nodeRequire(name);
  } else {
    return nodeRequire('remote').require(name);
  }
}
