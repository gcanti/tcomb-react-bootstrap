'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Well');
var name = t.react.getDisplayName(Factory);

var BsSize = require('./util/BsSize');

var Type = t.struct({
  __tag__:      t.enums.of(name, name),
  bsSize:       t.maybe(BsSize),
  children:     t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
