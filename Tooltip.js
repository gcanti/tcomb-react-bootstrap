var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Tooltip');

var Model = model.create('Tooltip', {
  children: model.Children,
  placement: t.maybe(model.Placement),
  positionLeft: t.maybe(t.Num),
  positionTop: t.maybe(t.Num),
  arrowOffsetLeft: t.maybe(t.Num),
  arrowOffsetTop: t.maybe(t.Num)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);