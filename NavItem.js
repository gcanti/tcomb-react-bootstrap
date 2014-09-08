'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/NavItem');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:  t.enums.of(name, name),
  onSelect: t.maybe(t.Func),
  active:   t.maybe(t.Bool),
  disabled: t.maybe(t.Bool),
  href:     t.maybe(t.Str),
  title:    t.maybe(t.Str),
  key:      t.maybe(t.react.Key),
  children: t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
