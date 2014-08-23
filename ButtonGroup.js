var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/ButtonGroup');
var Button = require('./Button');

var Model = model.create('ButtonGroup', {
  children:  t.list(Button.Model),
  vertical:  t.maybe(t.Bool),
  justified: t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);