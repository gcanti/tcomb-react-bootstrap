var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/ButtonGroup');

var Model = model.create('ButtonGroup', {
  vertical:  t.maybe(t.Bool),
  justified: t.maybe(t.Bool)
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);