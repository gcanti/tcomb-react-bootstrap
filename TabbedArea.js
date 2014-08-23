var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/TabbedArea');

var Model = model.create('TabbedArea', {
  children: model.Children,
  bsClass: t.maybe(model.BsClass),
  bsStyle: t.maybe(model.NavStyle), // TODO: report duplicate propType in BootstrapMixin
  bsSize: t.maybe(model.BsSize),
  animation: t.maybe(t.Bool),
  onSelect: t.maybe(t.Func),
  defaultActiveKey: t.maybe(model.Key) // TODO: report missing propType
});

module.exports = model.bind(Model, Component);