var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Alert');

var Model = model.create('Alert', {
  children: model.Children,
  onDismiss: t.maybe(t.Func),
  dismissAfter: t.maybe(t.Num)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);