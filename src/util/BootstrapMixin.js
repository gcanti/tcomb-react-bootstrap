var t = require('tcomb');
var model = require('./model');

var BootstrapMixin = {
  bsClass: t.maybe(model.BsClass),
  bsStyle: t.maybe(model.BsStyle),
  bsSize: t.maybe(model.BsSize)
};

module.exports = BootstrapMixin;