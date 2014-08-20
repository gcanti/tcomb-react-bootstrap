var t = require('tcomb');
var constants = require('react-bootstrap/constants');

var Renderable = t.Any; // TODO: better typing of React.PropTypes.renderable
var Key = t.union([t.Str, t.Num], 'Key');
var ComponentClass = t.subtype(t.Str, function () { return true; }, 'ComponentClass'); // TODO implement valid React component class
var Mountable = t.Any; // TODO better typing
var Glyph = t.enums.of(constants.GLYPHS, 'Glyph');
var Placement = t.enums.of('top right bottom left', 'Placement');
var NavStyle = t.enums.of('tabs pills', 'NavStyle');
var Direction = t.enums.of('prev next', 'Direction');
var BsClass = t.enums(constants.CLASSES, 'BsClass');
var BsStyle = t.enums(constants.STYLES, 'BsStyle');
var BsSize = t.enums(constants.SIZES, 'BsSize');

function create(name, props, mixins) {
  mix(props, mixins);
  var model = t.struct(props, name);
  model.warnings = function (props) {
    return warnings(name, props, this.meta.props);
  };
  return model;
}

function bind(Model, Component) {
  return function (props) {
    // if there are no attributes React send null instead of {}
    props = props || {};
    // I can't slice arguments otherwise React sees an array and complaints with
    // "Each child in an array should have a unique "key" prop."
    arguments[0] = Model(props);
    // print found warnings
    warn(Model.warnings(props));
    // redirect to react-bootstrap
    return Component.apply(Component, arguments);
  };
}

function mix(props, mixins) {
  if (mixins) {
    props = mixins.reduce(function (acc, x) {
      return t.mixin(acc, x);
    }, props);
  }
  return props;
}

function warnings(name, actualProps, expectedProps) {
  var warnings = [];
  for (var k in actualProps) {
    if (actualProps.hasOwnProperty(k)) {
      if (!expectedProps.hasOwnProperty(k)) {
        warnings.push(t.format('component `%s` does not handle property `%s`', name, k));
      }
    }
  }
  return warnings;
}

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

module.exports = {
  create: create,
  bind: bind,
  Renderable: Renderable,
  Key: Key,
  ComponentClass: ComponentClass,
  Mountable: Mountable,
  Glyph: Glyph,
  Placement: Placement,
  NavStyle: NavStyle,
  Direction: Direction,
  BsSize: BsSize,
  BsStyle: BsStyle,
  BsClass: BsClass
};