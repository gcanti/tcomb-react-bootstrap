'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/ModalTrigger');
var name = t.react.getDisplayName(Factory);

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  container:  t.maybe(t.react.Mountable),
  children:   t.Any
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
