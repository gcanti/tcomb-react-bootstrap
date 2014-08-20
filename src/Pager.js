var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Pager');

var Model = model.create('Pager', {
  onSelect: t.maybe(t.Func)
});

module.exports = model.bind(Model, Component);