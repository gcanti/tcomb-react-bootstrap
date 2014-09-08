'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Navbar');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:            t.enums.of(name, name),
  fixedTop:           t.maybe(t.Bool),
  fixedBottom:        t.maybe(t.Bool),
  staticTop:          t.maybe(t.Bool),
  inverse:            t.maybe(t.Bool),
  fluid:              t.maybe(t.Bool),
  role:               t.maybe(t.Str),
  brand:              t.maybe(t.react.Renderable),
  toggleButton:       t.maybe(t.react.Renderable),
  onToggle:           t.maybe(t.Func),
  navExpanded:        t.maybe(t.Bool),
  defaultNavExpanded: t.maybe(t.Bool),
  children:           t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
