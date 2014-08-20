var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Nav');

var Model = model.create('Nav', {
  bsClass: t.maybe(model.BsClass),
  bsStyle: t.maybe(model.NavStyle), // TODO: report duplicate propType in BootstrapMixin
  bsSize: t.maybe(model.BsSize),
  stacked: t.maybe(t.Bool),
  justified: t.maybe(t.Bool),
  onSelect: t.maybe(t.Func),
  collapsable: t.maybe(t.Bool), // TODO: report duplicate propType in CollapsableMixin
  expanded: t.maybe(t.Bool), // TODO: report duplicate propType in CollapsableMixin
  defaultExpanded: t.maybe(t.Bool),
  navbar: t.maybe(t.Bool),
  activeKey: t.maybe(model.Key) // TODO: report missin propType
});

module.exports = model.bind(Model, Component);