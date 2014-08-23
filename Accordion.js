var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Accordion');

var Model = model.create('Accordion', {
  children: model.Children,
});

module.exports = model.bind(Model, Component);