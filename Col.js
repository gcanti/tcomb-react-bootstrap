'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/Col');
var name = t.react.getDisplayName(Factory);

var ColInt = require('./util/ColInt');

var Type = t.struct({
  __tag__:      t.enums.of(name, name),
  xs:         t.maybe(ColInt),
  sm:         t.maybe(ColInt),
  md:         t.maybe(ColInt),
  lg:         t.maybe(ColInt),
  xsOffset:   t.maybe(ColInt),
  smOffset:   t.maybe(ColInt),
  mdOffset:   t.maybe(ColInt),
  lgOffset:   t.maybe(ColInt),
  xsPush:     t.maybe(ColInt),
  smPush:     t.maybe(ColInt),
  mdPush:     t.maybe(ColInt),
  lgPush:     t.maybe(ColInt),
  xsPull:     t.maybe(ColInt),
  smPull:     t.maybe(ColInt),
  mdPull:     t.maybe(ColInt),
  lgPull:     t.maybe(ColInt),
  className:  t.maybe(t.Str),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
