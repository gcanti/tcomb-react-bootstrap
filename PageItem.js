'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/PageItem');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:  t.enums.of(name, name),
  disabled: t.maybe(t.Bool),
  previous: t.maybe(t.Bool),
  next:     t.maybe(t.Bool),
  onSelect: t.maybe(t.Func),
  href:     t.maybe(t.Str),
  children: t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
