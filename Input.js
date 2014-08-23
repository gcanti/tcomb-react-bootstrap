var t = require('tcomb');
var model = require('./util/model');
var EventableMixin = require('./util/EventableMixin');
var Component = require('react-bootstrap/Input');

var InputStyle = t.enums.of('success warning error', 'InputStyle');

var InputType = t.enums.of('text password checkbox radio select textarea static', 'InputType');

var Model = model.create('Input', {
  children: model.Children,
  type: t.maybe(t.Str),
  label: t.maybe(model.Renderable),
  help: t.maybe(model.Renderable),
  addonBefore: t.maybe(model.Renderable),
  addonAfter: t.maybe(model.Renderable),
  bsStyle: t.maybe(InputStyle),
  hasFeedback: t.maybe(t.Bool),
  groupClassName: t.maybe(t.Str),
  wrapperClassName: t.maybe(t.Str),
  labelClassName: t.maybe(t.Str),
  checked: t.maybe(t.Bool), // TODO report missing propType
  readOnly: t.maybe(t.Bool), // TODO report missing propType
  multiple: t.maybe(t.Bool), // TODO report missing propType
  value: t.maybe(t.Str), // TODO report missing propType
  defaultValue: t.maybe(t.Str), // TODO report missing propType
  type: InputType, // TODO report missing propType
  ref: t.maybe(t.Str) // TODO report missing propType
}, [EventableMixin]);

module.exports = model.bind(Model, Component);