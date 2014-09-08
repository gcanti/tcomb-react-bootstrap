'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Grid');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  fluid:      t.maybe(t.Bool),
  className:  t.maybe(t.Str),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
