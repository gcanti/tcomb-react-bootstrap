'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Pager');
var name = t.react.getDisplayName(Factory);

var PageItem = require('./PageItem');

var Type = t.struct({
  __tag__:  t.enums.of(name, name),
  onSelect: t.maybe(t.Func),
  children: t.list(PageItem.type, 'PageItems')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
