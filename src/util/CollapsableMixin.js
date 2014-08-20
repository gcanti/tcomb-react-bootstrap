var t = require('tcomb');

var CollapsableMixin = {
  collapsable: t.maybe(t.Bool),
  defaultExpanded: t.maybe(t.Bool),
  expanded: t.maybe(t.Bool)
};

module.exports = CollapsableMixin;