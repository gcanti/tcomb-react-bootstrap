var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Row');

var Model = model.create('Row', {
  className: t.maybe(t.Str)
});

module.exports = model.bind(Model, Component);