var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/MenuItem');

var Model = model.create('MenuItem', {
  header:   t.maybe(t.Bool),
  divider:  t.maybe(t.Bool),
  href:     t.maybe(t.Str),
  title:    t.maybe(t.Str),
  onSelect: t.maybe(t.Func),
  key: t.maybe(model.Key) // TODO: report missing propType
});

module.exports = model.bind(Model, Component);