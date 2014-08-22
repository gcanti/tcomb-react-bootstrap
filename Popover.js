var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Popover');

var Model = model.create('Popover', {
  placement: model.Placement,
  positionLeft: t.maybe(t.Num),
  positionTop: t.maybe(t.Num),
  arrowOffsetLeft: t.maybe(t.Num),
  arrowOffsetTop: t.maybe(t.Num),
  title: t.maybe(model.Renderable)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);