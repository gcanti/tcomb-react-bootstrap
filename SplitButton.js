'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/SplitButton');
var name = t.react.getDisplayName(Factory);

var BsSize = require('./util/BsSize');
var ButtonBsStyle = require('./util/ButtonBsStyle');

var Type = t.struct({
  __tag__:       t.enums.of(name, name),
  bsStyle:       t.maybe(ButtonBsStyle),
  bsSize:        t.maybe(BsSize),
  pullRight:     t.maybe(t.Bool),
  title:         t.maybe(t.react.Renderable),
  href:          t.maybe(t.Str),
  dropdownTitle: t.maybe(t.react.Renderable),
  onClick:       t.maybe(t.Func),
  onSelect:      t.maybe(t.Func),
  disabled:      t.maybe(t.Bool),
  children:      t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
