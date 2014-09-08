'use strict';

var t = require('tcomb-react');

module.exports = t.subtype(t.Num, function (n) {
  return n >= 1 && n <= 12 && n === parseInt(n, 10);
}, 'ColInt');