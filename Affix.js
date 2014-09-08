'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Affix');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:      t.enums.of(name, name),
  offset:       t.maybe(t.Num),
  offsetTop:    t.maybe(t.Num),
  offsetBottom: t.maybe(t.Num),
  children:     t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
