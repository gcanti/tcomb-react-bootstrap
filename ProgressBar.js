'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/ProgressBar');
var name = t.react.getDisplayName(Factory);

var BsStyle = require('./util/BsStyle');

var Type = t.struct({
  __tag__:  t.enums.of(name, name),
  bsStyle:      BsStyle,
  min:      t.maybe(t.Num),
  now:      t.maybe(t.Num),
  max:      t.maybe(t.Num),
  label:    t.Any,
  srOnly:   t.maybe(t.Bool),
  striped:  t.maybe(t.Bool),
  active:   t.maybe(t.Bool),
  children: t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
