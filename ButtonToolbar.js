'use strict';

var t = require('tcomb-react');
var Factory = require('react-bootstrap/ButtonToolbar');

// fix react-bootstrap bug: react-bootstrap/ButtonToolbar has ButtonGroup as displayName
Factory.type.displayName = 'ButtonToolbar';

var name = t.react.getDisplayName(Factory);

var ButtonGroup = require('./ButtonGroup');

var Type = t.struct({
  __tag__:    t.enums.of(name, name),
  children:   t.list(ButtonGroup.type, 'ButtonGroups')
}, name);

module.exports = t.react.bind(Factory, Type, {strict: false});
