'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Glyphicon');
var name = t.react.getDisplayName(Factory);

var Glyph = require('./util/Glyph');

var Type = t.struct({
  __tag__:  t.enums.of(name, name),
  glyph:    Glyph
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
