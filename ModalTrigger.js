var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/ModalTrigger');

var Model = model.create('ModalTrigger', {
  children: model.Children,
  container: t.maybe(model.Mountable),
  modal: model.Renderable
});

module.exports = model.bind(Model, Component);