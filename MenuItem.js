'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/MenuItem');
var name = t.react.getDisplayName(Factory);

var predicate = function (x) {
  return (x.divider && t.Nil.is(x.children)) ||  (!x.divider && !t.Nil.is(x.children));
};
predicate.__doc__ = 'divider = true and no children or divider = false and children';

var Type = t.subtype(t.struct({
  __tag__:    t.enums.of(name, name),
  header:     t.maybe(t.Bool),
  divider:    t.maybe(t.Bool),
  href:       t.maybe(t.Str),
  title:      t.maybe(t.Str),
  onSelect:   t.maybe(t.Func),
  key:        t.maybe(t.react.Key),
  children:   t.maybe(t.Any),
  onClick:    t.maybe(t.Func)
}), predicate, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
