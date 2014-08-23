var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Col');

var Model = model.create('Col', {
  children: model.Children,
  xs: t.maybe(t.Num),
  sm: t.maybe(t.Num),
  md: t.maybe(t.Num),
  lg: t.maybe(t.Num),
  xsOffset: t.maybe(t.Num),
  smOffset: t.maybe(t.Num),
  mdOffset: t.maybe(t.Num),
  lgOffset: t.maybe(t.Num),
  xsPush: t.maybe(t.Num),
  smPush: t.maybe(t.Num),
  mdPush: t.maybe(t.Num),
  lgPush: t.maybe(t.Num),
  xsPull: t.maybe(t.Num),
  smPull: t.maybe(t.Num),
  mdPull: t.maybe(t.Num),
  lgPull: t.maybe(t.Num),
  className: t.maybe(t.Str)
});

module.exports = model.bind(Model, Component);