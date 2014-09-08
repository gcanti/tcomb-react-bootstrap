'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Popover');
var name = t.react.getDisplayName(Factory);

var Placement = require('./util/Placement');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  placement:        Placement,
  positionLeft:     t.maybe(t.Num),
  positionTop:      t.maybe(t.Num),
  arrowOffsetLeft:  t.maybe(t.Num),
  arrowOffsetTop:   t.maybe(t.Num),
  title:            t.maybe(t.react.Renderable),
  children:         t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
