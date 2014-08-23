var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Button');

var Model = model.create('Button', {
  children: model.Children,
  active: t.maybe(t.Bool),
  disabled: t.maybe(t.Bool),
  block: t.maybe(t.Bool),
  navItem: t.maybe(t.Bool),
  navDropdown: t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);