(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // TODO
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'), require('react-bootstrap'), require('react-bootstrap/constants'), require('tcomb'));
  } else {
    root.TcombReactBootstrap = factory(root.React, root.ReactBootstrap, root.ReactBootstrap.constants, root.t);
  }
}(this, function (React, bs, constants, t) {

  'use strict';

  var Nil = t.Nil;
  var Str = t.Str;
  var Num = t.Num;
  var Func = t.Func;
  var struct = t.struct;
  var subtype = t.subtype;
  var enums = t.enums;
  var maybe = t.maybe;

  //
  // utils
  //

  // make all types of a struct optional
  function maybefy(props) {
    var ret = {};
    for (var k in props) {
      if (props.hasOwnProperty(k)) {
        ret[k] = maybe(props[k]);
      }
    }
    return ret;
  }

  function concurrentProps(p1, p2) {
    return function (x) {
      return Nil.is(x[p1]) === Nil.is(x[p2]);
    }
  }

  function bind(Config, Component) {
    var f = function(config) {
      config = Config(config);
      var args = Array.prototype.slice.call(arguments, 1);
      args = [config].concat(args);
      return Component.apply(Component, args);
    };
    f.Config = Config;
    return f;
  }

  //
  // common props
  //

  var BsClass = enums(constants.CLASSES);
  var BsStyle = enums(constants.STYLES);
  var BsSize = enums(constants.SIZES);
  var Glyph = enums.of(constants.GLYPHS);

  //
  // Alert
  //

  var Alert = (function () {

    var Struct = struct(maybefy({
        bsClass: BsClass,
        bsStyle: BsStyle,
        bsSize: BsSize,
        onDismiss: Func,
        dismissAfter: Num
    }), '$Alert');

    Struct.prototype.render = function() {
      var args = [this].concat(arguments);
      return Component.apply(Component, args);
    };

    var Config = subtype(Struct, concurrentProps('onDismiss', 'dismissAfter'), 'Alert');
    var Component = bs.Alert;

    return bind(Config, Component);

  })();

  return {
    Alert: Alert
  }

}));