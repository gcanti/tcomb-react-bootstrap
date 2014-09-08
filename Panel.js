'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Panel');
var name = t.react.getDisplayName(Factory);

var PanelBsStyle = t.enums.of('primary info success warning danger', 'PanelBsStyle');

var Type = t.struct({
  __tag__:          t.enums.of(name, name),
  bsStyle:          t.maybe(PanelBsStyle),
  header:           t.maybe(t.react.Renderable),
  footer:           t.maybe(t.react.Renderable),
  onClick:          t.maybe(t.Func),
  key:              t.maybe(t.react.Key),
  children:         t.Any,
  // collapse
  collapsable:      t.maybe(t.Bool),
  defaultExpanded:  t.maybe(t.Bool),
  expanded:         t.maybe(t.Bool)
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
