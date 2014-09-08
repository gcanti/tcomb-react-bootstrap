'use strict';

var t = require('tcomb-react');

module.exports = t.subtype(t.Num, function (n) {
  return n >= 0 && n === parseInt(n, 10);
}, 'PositiveInt');