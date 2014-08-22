var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/PanelGroup');

var Model = model.create('PanelGroup', {
  collapsable: t.maybe(t.Bool),
  activeKey: t.Any,
  defaultActiveKey: t.Any,
  onSelect: t.maybe(t.Func),
  accordion: t.maybe(t.Bool) // TODO: report missing propType
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);