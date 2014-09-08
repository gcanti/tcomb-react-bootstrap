'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/CarouselItem');
var name = t.react.getDisplayName(Factory);

var Direction = require('./util/Direction');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  direction:        t.maybe(Direction),
  onAnimateOutEnd:  t.maybe(t.Func),
  active:           t.maybe(t.Bool),
  caption:          t.maybe(t.react.Renderable),
  children:         t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
