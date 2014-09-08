'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Modal');
var name = t.react.getDisplayName(Factory);

var Static = t.enums.of('static', 'Static');
var Backdrop = t.union([Static, t.Bool], 'Backdrop');
Backdrop.dispatch = function (x) {
  if (t.Bool.is(x)) { return t.Bool; }
  if (Static.is(x)) { return Static; }
};

var Type = t.struct({
  __tag__:        t.enums.of(name, name),
  title:          t.maybe(t.react.Renderable),
  backdrop:       t.maybe(Backdrop),
  keyboard:       t.maybe(t.Bool),
  closeButton:    t.maybe(t.Bool),
  animation:      t.maybe(t.Bool),
  onRequestHide:  t.Func,
  children:       t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
