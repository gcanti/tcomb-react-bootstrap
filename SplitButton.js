var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/SplitButton');

var Model = model.create('SplitButton', {
  children: model.Children,
  pullRight:     t.maybe(t.Bool),
  title:         t.maybe(model.Renderable),
  href:          t.maybe(t.Str),
  dropdownTitle: t.maybe(model.Renderable),
  onClick:       t.maybe(t.Func),
  onSelect:      t.maybe(t.Func),
  disabled:      t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);