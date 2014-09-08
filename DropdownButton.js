'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/DropdownButton');
var name = t.react.getDisplayName(Factory);

var BsSize = require('./util/BsSize');
var ButtonBsStyle = require('./util/ButtonBsStyle');
var MenuItem = require('./MenuItem');

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  bsStyle:    t.maybe(ButtonBsStyle),
  bsSize:     t.maybe(BsSize),
  pullRight:  t.maybe(t.Bool),
  dropup:     t.maybe(t.Bool),
  title:      t.maybe(t.react.Renderable),
  href:       t.maybe(t.Str),
  onClick:    t.maybe(t.Func),
  onSelect:   t.maybe(t.Func),
  navItem:    t.maybe(t.Bool),
  key:        t.maybe(t.react.Key),
  children:   t.list(MenuItem.type, 'MenuItems')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
