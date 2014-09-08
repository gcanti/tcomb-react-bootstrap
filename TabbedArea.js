'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/TabbedArea');
var name = t.react.getDisplayName(Factory);

var NavBsStyle = require('./util/NavBsStyle');
var TabPane = require('./TabPane');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  bsStyle:          t.maybe(NavBsStyle),
  animation:        t.maybe(t.Bool),
  onSelect:         t.maybe(t.Func),
  defaultActiveKey: t.maybe(t.react.Key),
  children:         t.list(TabPane.type, 'TabPanes')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
