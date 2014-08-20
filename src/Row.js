var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Row');

var Model = model.create('Row', {
  componentClass: t.maybe(model.ComponentClass)
});

module.exports = model.bind(Model, Component);