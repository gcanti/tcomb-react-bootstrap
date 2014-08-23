var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Carousel');

var Model = model.create('Carousel', {
  children: model.Children,
  slide: t.maybe(t.Bool),
  indicators: t.maybe(t.Bool),
  controls: t.maybe(t.Bool),
  pauseOnHover: t.maybe(t.Bool),
  wrap: t.maybe(t.Bool),
  onSelect: t.maybe(t.Func),
  onSlideEnd: t.maybe(t.Func),
  activeIndex: t.maybe(t.Num),
  defaultActiveIndex: t.maybe(t.Num),
  direction: t.maybe(model.Direction)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);