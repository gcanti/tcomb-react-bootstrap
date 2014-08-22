var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/CarouselItem');

var Model = model.create('CarouselItem', {
  direction: t.maybe(model.Direction),
  onAnimateOutEnd: t.maybe(t.Func),
  active: t.maybe(t.Bool),
  caption: t.maybe(model.Renderable)
});

module.exports = model.bind(Model, Component);