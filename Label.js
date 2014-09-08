'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Label');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  className:  t.maybe(t.Str),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
