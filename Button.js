'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Button');
var name = t.react.getDisplayName(Factory);

var BsSize = require('./util/BsSize');
var ButtonBsStyle = require('./util/ButtonBsStyle');

var Type = t.struct({
  __tag__:      t.enums.of(name, name),
  bsStyle:      t.maybe(ButtonBsStyle),
  bsSize:       t.maybe(BsSize),
  active:       t.maybe(t.Bool),
  disabled:     t.maybe(t.Bool),
  block:        t.maybe(t.Bool),
  navItem:      t.maybe(t.Bool),
  navDropdown:  t.maybe(t.Bool),
  children:     t.Any,
  // events
  onClick:      t.maybe(t.Func)
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
