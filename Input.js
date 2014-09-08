'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Input');
var name = t.react.getDisplayName(Factory);

var InputBsStyle = t.enums.of('success warning error', 'InputBsStyle');
var InputType = t.enums.of('text password checkbox radio select textarea static', 'InputType');

var Type = t.struct({
  __tag__:      t.enums.of(name, name),
  type:         InputType,
  bsStyle:      t.maybe(InputBsStyle),
  label:        t.maybe(t.react.Renderable),
  help:         t.maybe(t.react.Renderable),
  addonBefore:  t.maybe(t.react.Renderable),
  addonAfter:   t.maybe(t.react.Renderable),
  hasFeedback:  t.maybe(t.Bool),
  groupClassName: t.maybe(t.Str),
  wrapperClassName: t.maybe(t.Str),
  labelClassName: t.maybe(t.Str),
  checked:      t.maybe(t.Bool),
  readOnly:     t.maybe(t.Bool),
  multiple:     t.maybe(t.Bool),
  value:        t.maybe(t.Str),
  defaultValue: t.maybe(t.Str),
  ref:          t.maybe(t.react.Ref),
  children:     t.Any,
  // events
  onClick:      t.maybe(t.Func),
  onChange:     t.maybe(t.Func)
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
