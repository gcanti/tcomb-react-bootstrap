var t = require('tcomb');
var model = require('./util/model');
var Component = require('react-bootstrap/Jumbotron');

var Model = model.create('Jumbotron', {
});

module.exports = model.bind(Model, Component);