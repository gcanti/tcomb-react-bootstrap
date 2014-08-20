var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Table');

var Model = model.create('Table', {
  striped: t.maybe(t.Bool),
  bordered: t.maybe(t.Bool),
  condensed: t.maybe(t.Bool),
  hover: t.maybe(t.Bool),
  responsive: t.maybe(t.Bool)
});

module.exports = model.bind(Model, Component);