var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/OverlayTrigger');

var TriggerA = t.enums.of('manual click hover focus', 'TriggerA'); // TODO understand what are these types
var TriggerB = t.enums.of('click hover focus', 'TriggerB');
var TriggerC = t.list(TriggerB);
var Trigger = t.union([TriggerA, TriggerC]);

var Model = model.create('OverlayTrigger', {
  container: t.maybe(model.Mountable),
  trigger: t.maybe(Trigger),
  placement: t.maybe(model.Placement),
  delay: t.maybe(t.Num),
  delayShow: t.maybe(t.Num),
  delayHide: t.maybe(t.Num),
  defaultOverlayShown: t.maybe(t.Bool),
  overlay: model.Renderable
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);