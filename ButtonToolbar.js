var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/ButtonToolbar');

var Model = model.create('ButtonToolbar', {
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);