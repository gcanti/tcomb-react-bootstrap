'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Table');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  striped:    t.maybe(t.Bool),
  bordered:   t.maybe(t.Bool),
  condensed:  t.maybe(t.Bool),
  hover:      t.maybe(t.Bool),
  responsive: t.maybe(t.Bool),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
