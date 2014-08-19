'use strict';

var domain = require('./domain');
var ReactBootstrap = require('react-bootstrap');

//
// utils
//
function noop() {}

var warn = (function () {
  var isConsoleSupported = console && console.warn;
  if (!isConsoleSupported) { return noop; }
  return function (warnings) {
    warnings.forEach(function (warning) {
      console.warn('[tcomb-react-bootstrap] Warning: %s', warning);
    });
  };
})();

function bind(name) {
  var Model = domain[name];
  // export
  exports[name] = function (props) {
    // if there are no attributes React send null instead of {}
    props = props || {};
    // I can't slice arguments otherwise React sees an array and complaints with
    // "Each child in an array should have a unique "key" prop."
    arguments[0] = Model(props);
    // print found warnings
    if (Model.warnings) {
      warn(Model.warnings(props));
    }
    // redirect to react-bootstrap
    var c = ReactBootstrap[name]; 
    return c.apply(c, arguments);
  };
}

//
// bindings
//
Object.keys(domain).forEach(bind);
