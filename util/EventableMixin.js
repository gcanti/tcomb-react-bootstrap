var t = require('tcomb');

var EventableMixin = {
  onClick: t.maybe(t.Func),
  onChange: t.maybe(t.Func)
};

module.exports = EventableMixin;