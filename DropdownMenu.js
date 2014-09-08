'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/DropdownMenu');
var name = t.react.getDisplayName(Factory);

var BsSize = require('./util/BsSize');
var ButtonBsStyle = require('./util/ButtonBsStyle');
var MenuItem = require('./MenuItem');

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  pullRight:  t.maybe(t.Bool),
  onSelect:   t.maybe(t.Func),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
