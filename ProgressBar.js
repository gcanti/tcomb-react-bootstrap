var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/ProgressBar');

var Model = model.create('ProgressBar', {
  children: model.Children,
  min: t.maybe(t.Num),
  now: t.maybe(t.Num),
  max: t.maybe(t.Num),
  label: t.maybe(model.Renderable),
  srOnly: t.maybe(t.Bool),
  striped: t.maybe(t.Bool),
  active: t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);