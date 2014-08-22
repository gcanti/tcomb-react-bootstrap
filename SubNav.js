var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/SubNav');

var Model = model.create('SubNav', {
  onSelect: t.maybe(t.Func),
  active: t.maybe(t.Bool),
  disabled: t.maybe(t.Bool),
  href: t.maybe(t.Str),
  title: t.maybe(t.Str),
  text: t.maybe(model.Renderable)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);