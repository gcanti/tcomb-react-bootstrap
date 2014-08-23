var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var CollapsableMixin = require('./util/CollapsableMixin');
var Component = require('react-bootstrap/Panel');

var Model = model.create('Panel', {
  children: model.Children,
  header: t.maybe(model.Renderable),
  footer: t.maybe(model.Renderable),
  onClick: t.maybe(t.Func),
  key: t.maybe(model.Key) // TODO: report missing propType
}, [BootstrapMixin, CollapsableMixin]);

module.exports = model.bind(Model, Component);