var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/NavItem');

var Model = model.create('NavItem', {
  children: model.Children,
  onSelect: t.maybe(t.Func),
  active: t.maybe(t.Bool),
  disabled: t.maybe(t.Bool),
  href: t.maybe(t.Str),
  title: t.maybe(t.Str),
  key: t.maybe(model.Key)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);