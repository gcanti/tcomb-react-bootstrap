'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/OverlayTrigger');
var name = t.react.getDisplayName(Factory);

var PositiveInt = require('./util/PositiveInt');
var Placement = require('./util/Placement');
var TriggerA = t.enums.of('manual click hover focus', 'TriggerA'); // TODO understand what exactly are these types in react-bootstrap
var TriggerB = t.enums.of('click hover focus', 'TriggerB');
var TriggerC = t.list(TriggerB, 'TriggerC');
var Trigger = t.union([TriggerA, TriggerC], 'Trigger');

var Type = t.struct({
  __tag__:              t.enums.of(name, name),
  container:            t.maybe(t.react.Mountable),
  trigger:              t.maybe(Trigger),
  placement:            t.maybe(Placement),
  delay:                t.maybe(PositiveInt),
  delayShow:            t.maybe(PositiveInt),
  delayHide:            t.maybe(PositiveInt),
  defaultOverlayShown:  t.maybe(t.Bool),
  overlay:              t.react.Renderable,
  children:             t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
