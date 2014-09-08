'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Nav');
var name = t.react.getDisplayName(Factory);

var NavBsStyle = require('./util/NavBsStyle');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  bsStyle:          t.maybe(NavBsStyle),
  stacked:          t.maybe(t.Bool),
  justified:        t.maybe(t.Bool),
  onSelect:         t.maybe(t.Func),
  collapsable:      t.maybe(t.Bool),
  expanded:         t.maybe(t.Bool),
  defaultExpanded:  t.maybe(t.Bool),
  navbar:           t.maybe(t.Bool),
  activeKey:        t.maybe(t.react.Key),
  children:         t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
