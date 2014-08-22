var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Affix');

var Model = model.create('Affix', {
  offset: t.maybe(t.Num),
  offsetTop: t.maybe(t.Num),
  offsetBottom: t.maybe(t.Num)
});

module.exports = model.bind(Model, Component);