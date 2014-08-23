var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/TabPane');

var Model = model.create('TabPane', {
  children: model.Children,
  key: t.maybe(model.Key), // TODO: report missing propType
  tab: t.maybe(t.Str) // TODO: report missing propType
});

module.exports = model.bind(Model, Component);