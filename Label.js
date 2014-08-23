var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Label');

var Model = model.create('Label', {
  children: model.Children,
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);