var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/PageItem');

var Model = model.create('PageItem', {
  children: model.Children,
  disabled: t.maybe(t.Bool),
  previous: t.maybe(t.Bool),
  next: t.maybe(t.Bool),
  onSelect: t.maybe(t.Func),
  href: t.maybe(t.Str) // TODO: report missing propType
});

module.exports = model.bind(Model, Component);