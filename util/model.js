var t = require('tcomb');
var constants = require('react-bootstrap/constants');

//
// common types
//

var Children = t.Any;
var Renderable = t.Any; // TODO: better typing of React.PropTypes.renderable
var Key = t.union([t.Str, t.Num], 'Key');
var Mountable = t.Any; // TODO better typing
var Glyph = t.enums.of(constants.GLYPHS, 'Glyph');
var Placement = t.enums.of('top right bottom left', 'Placement');
var NavStyle = t.enums.of('tabs pills', 'NavStyle');
var Direction = t.enums.of('prev next', 'Direction');
var BsClass = t.enums(constants.CLASSES, 'BsClass');
var BsStyle = t.enums(constants.STYLES, 'BsStyle');
var BsSize = t.enums(constants.SIZES, 'BsSize');

//
// heavy lifting
//

function create(name, props, mixins) {
  mix(props, mixins);
  // HACK: add a synthetic name needed by bind()
  props.__name__ = t.enums.of(name, name);
  return t.struct(props, name);
}

function bind(Model, Component) {
  var f = function (props) {
    
    // if there are no attributes React send null instead of {}
    props = props || {};
    
    // HACK: add syntheticName prop
    props.__name__ = Model.meta.name;
    
    // HACK: add children prop
    if (arguments.length > 1) {
      props.children = extractProps(Array.prototype.slice.call(arguments, 1));
    }
    
    // forbid undefined props
    checkForbiddenProps(t.getName(Model), props, Model.meta.props);
    
    // check types of allowed properties
    arguments[0] = Model(props);
    
    // dispatch to react-bootstrap component
    return Component.apply(Component, arguments);
  };

  // attach the model to the view
  f.Model = Model;
  
  return f;
}

//
// utils
//

function mix(props, mixins) {
  if (mixins) {
    props = mixins.reduce(function (acc, x) {
      return t.mixin(acc, x);
    }, props);
  }
  return props;
}

function extractProps(x) {
  if (t.Arr.is(x)) {
    return x.map(extractProps);
  } else if (t.Obj.is(x)) {
    var props = x.props;
    if (x.children) {
      props.children = extractProps(x.children);
    }
    return props;
  }
  return x;
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
  Children: Children,
  Renderable: Renderable,
  Key: Key,
  Mountable: Mountable,
  Glyph: Glyph,
  Placement: Placement,
  NavStyle: NavStyle,
  Direction: Direction,
  BsSize: BsSize,
  BsStyle: BsStyle,
  BsClass: BsClass
};