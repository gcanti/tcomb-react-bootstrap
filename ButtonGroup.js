'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/ButtonGroup');
var name = t.react.getDisplayName(Factory);

var Button = require('./Button');

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  vertical:   t.maybe(t.Bool),
  justified:  t.maybe(t.Bool),
  children:   t.list(Button.type, 'Buttons')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
