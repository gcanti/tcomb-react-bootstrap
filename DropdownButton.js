var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/DropdownButton');

var Model = model.create('DropdownButton', {
  children: model.Children,
  pullRight: t.maybe(t.Bool),
  dropup: t.maybe(t.Bool),
  title: t.maybe(model.Renderable),
  href: t.maybe(t.Str),
  onClick: t.maybe(t.Func),
  onSelect: t.maybe(t.Func),
  navItem: t.maybe(t.Bool),
  key: t.maybe(model.Key) // TODO: report missing propType
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);