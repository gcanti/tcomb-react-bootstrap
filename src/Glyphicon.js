var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Glyphicon');

var Model = model.create('Glyphicon', {
  glyph: model.Glyph
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);