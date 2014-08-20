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
  return t.struct(props, name);
}

function bind(Model, Component) {
  var f = function (props) {
    // if there are no attributes React send null instead of {}
    props = props || {};
    // forbid undefined props
    checkForbiddenProps(t.getName(Model), props, Model.meta.props);
    // check types of allowed properties
    arguments[0] = Model(props);
    // redirect to react-bootstrap
    return Component.apply(Component, arguments);
  };
  // attach the model to the view
  f.Model = Model;
  return f;
}

function mix(props, mixins) {
  if (mixins) {
    props = mixins.reduce(function (acc, x) {
      return t.mixin(acc, x);
    }, props);
  }
  return props;
}

function checkForbiddenProps(name, actualProps, expectedProps) {
  for (var k in actualProps) {
    if (actualProps.hasOwnProperty(k)) {
      if (!expectedProps.hasOwnProperty(k)) {
        t.fail(t.format('component `%s` does not handle property `%s`', name, k));
      }
    }
  }
}

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