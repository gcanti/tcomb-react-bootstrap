'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Alert');
var name = t.react.getDisplayName(Factory);
var Nil = t.Nil;

var BsSize = require('./util/BsSize');
var PositiveInt = require('./util/PositiveInt');
var BsStyle = require('./util/BsStyle');

var predicate = function (x) {
  return !( !Nil.is(x.dismissAfter) && Nil.is(x.onDismiss) );
};
predicate.__doc__ = '`onDismiss` specified when `dismissAfter` is specified';

var Type = t.subtype(t.struct({
  __tag__:      t.enums.of(name, name),
  bsStyle:      BsStyle,
  bsSize:       t.maybe(BsSize),
  onDismiss:    t.maybe(t.Func),
  dismissAfter: t.maybe(PositiveInt),
  children:     t.Any
}, 'UnsafeAlert'), predicate, name);

module.exports = t.react.bind(Factory, Type, {strict: false});