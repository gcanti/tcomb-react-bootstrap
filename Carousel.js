'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Carousel');
var name = t.react.getDisplayName(Factory);

var Direction = require('./util/Direction');
var CarouselItem = require('./CarouselItem');

var Type = t.struct({
  __tag__:            t.enums.of(name, name),
  slide:              t.maybe(t.Bool),
  indicators:         t.maybe(t.Bool),
  controls:           t.maybe(t.Bool),
  pauseOnHover:       t.maybe(t.Bool),
  wrap:               t.maybe(t.Bool),
  onSelect:           t.maybe(t.Func),
  onSlideEnd:         t.maybe(t.Func),
  activeIndex:        t.maybe(t.Num),
  defaultActiveIndex: t.maybe(t.Num),
  direction:          t.maybe(Direction),
  children:           t.list(CarouselItem.type, 'CarouselItems')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
