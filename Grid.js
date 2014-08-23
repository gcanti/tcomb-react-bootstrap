var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Grid');

var Model = model.create('Grid', {
  children: model.Children,
  fluid: t.maybe(t.Bool),
  className: t.maybe(t.Str)
});

module.exports = model.bind(Model, Component);