var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/PageHeader');

var Model = model.create('PageHeader', {
  children: model.Children,
});

module.exports = model.bind(Model, Component);