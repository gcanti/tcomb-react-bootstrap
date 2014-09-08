'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/PanelGroup');
var name = t.react.getDisplayName(Factory);

var Panel = require('./Panel');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  collapsable:      t.maybe(t.Bool),
  activeKey:        t.maybe(t.react.Key),
  defaultActiveKey: t.maybe(t.react.Key),
  onSelect:         t.maybe(t.Func),
  accordion:        t.maybe(t.Bool),
  children:         t.list(Panel.type, 'Panels')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
