var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Badge');

var Model = model.create('Badge', {
  children: model.Children,
  pullRight: t.maybe(t.Bool)
});

module.exports = model.bind(Model, Component);