var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Navbar');

var Model = model.create('Navbar', {
  fixedTop: t.maybe(t.Bool),
  fixedBottom: t.maybe(t.Bool),
  staticTop: t.maybe(t.Bool),
  inverse: t.maybe(t.Bool),
  fluid: t.maybe(t.Bool),
  role: t.maybe(t.Str),
  brand: t.maybe(model.Renderable),
  toggleButton: t.maybe(model.Renderable),
  onToggle: t.maybe(t.Func),
  navExpanded: t.maybe(t.Bool),
  defaultNavExpanded: t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);