var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Modal');

var Backdrop = t.union([t.enums.of('static'), t.Bool], 'Backdrop');

var Model = model.create('Modal', {
  children: model.Children,
  title: t.maybe(model.Renderable),
  backdrop: t.maybe(Backdrop),
  keyboard: t.maybe(t.Bool),
  closeButton: t.maybe(t.Bool),
  animation: t.maybe(t.Bool),
  onRequestHide: t.Func
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);