var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/DropdownMenu');

var Model = model.create('DropdownMenu', {
  pullRight: t.maybe(t.Bool),
  onSelect: t.maybe(t.Func)
});

module.exports = model.bind(Model, Component);