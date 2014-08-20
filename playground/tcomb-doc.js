!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.TcombDoc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  domain: require('./src/domain'),
  parse: require('./src/parser'),
  formatMarkdown: require('./src/formatMarkdown')
};

},{"./src/domain":2,"./src/formatMarkdown":3,"./src/parser":4}],2:[function(require,module,exports){
'use strict';

var t = require('tcomb');

var Str = t.Str;
var Obj = t.Obj;
var enums = t.enums;
var struct = t.struct;
var union = t.union;
var list = t.list;
var maybe = t.maybe;
var mixin = t.mixin;

function toJSON(kind) {
  return function () {
    return mixin({kind: kind}, this);
  };
}

var Enums = struct({
  name: Str,
  enums: Obj
}, 'Enums');

Enums.prototype.toJSON = toJSON('enums');

var List = struct({
  name: Str,
  type: Str
}, 'List');

List.prototype.toJSON = toJSON('list');

var Maybe = struct({
  name: Str,
  type: Str
}, 'Maybe');

Maybe.prototype.toJSON = toJSON('maybe');

var Prop = struct({
  name: Str,
  type: Str
}, 'Prop');

var Struct = struct({
  name: Str,
  props: list(Prop)
}, 'Struct');

Struct.prototype.toJSON = toJSON('struct');

var Subtype = struct({
  name: Str,
  type: Str,
  predicate: maybe(Str)
}, 'Subtype');

Subtype.prototype.toJSON = toJSON('subtype');

var Tuple = struct({
  name: Str,
  types: list(Str)
}, 'Tuple');

Tuple.prototype.toJSON = toJSON('tuple');

var Union = struct({
  name: Str,
  types: list(Str)
}, 'Union');

Union.prototype.toJSON = toJSON('union');

var Type = union([Struct, Enums, List, Maybe, Subtype, Tuple, Union], 'Type');

var Doc = struct({
  types: list(Type)
}, 'Doc');

Doc.prototype.toJSON = function (result) {
  return this.types.map(function (type) {
    return type.toJSON();
  });
};

module.exports = {
  Doc: Doc,
  Type: Type,
  Union: Union,
  Tuple: Tuple,
  Subtype: Subtype,
  Maybe: Maybe,
  List: List,
  Enums: Enums,
  Struct: Struct,
  Prop: Prop
};

},{"tcomb":"tcomb"}],3:[function(require,module,exports){
'use strict';

var t = require('tcomb');

var format = t.format;

function h1(s) {
  return format('# %s\n\n', s);
}

function h2(s) {
  return format('## %s\n\n', s);
}

function p(s) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.apply(null, [s + '\n\n'].concat(args));
}

function ul(lis) {
  return lis.map(function (li) {
    return format('- %s', li);
  }).join('\n') + '\n\n';
}

function formatMarkdown(json) {
  var md = '';
  json.forEach(function (type) {
    var kind = type.kind;
    var name = type.name;
    md += h1(name);
    switch(kind) {
      case 'struct' :
        if (type.props.length) {
          md += p('`%s` is a `struct` with the following props:', name);
          md += ul(type.props.sort().map(function (prop) {
            return format('`%s`: `%s`', prop.name, prop.type);
          }));
        } else {
          md += p('`%s` is a `struct` with no props.', name);
        }
        break;
      case 'maybe' :
        md += p('`%s` is a `maybe(%s)`', name, type.type);
        break;
      case 'subtype' :
        md += p('`%s` is a `subtype` of `%s` such that: %s', name, type.type, type.predicate);
        break;
      case 'list' :
        md += p('`%s` is a `list` of `%s`', name, type.type);
        break;
      case 'enums' :
        md += p('`%s` is an `enums` of:', name);
        md += ul(Object.keys(type.enums).sort().map(function (k) {
          return format('`"%s"`: `%j`', k, type.enums[k]);
        }));
        break;
      case 'tuple' :
        md += p('`%s` is a `tuple` of `%s`', name, type.types.join(', '));
        break;
      case 'union' :
        md += p('`%s` is a `union` of `%s`', name, type.types.join(', '));
        break;
      default :
        throw new Error(format('unknown kind %s', kind));
    }
  });
  return md;
}

module.exports = formatMarkdown;
},{"tcomb":"tcomb"}],4:[function(require,module,exports){
'use strict';

var t = require('tcomb');
var domain = require('./domain');

var Obj = t.Obj;
var format = t.format;
var isType = t.isType;
var getName = t.getName;

function isNamed(name) {
  // TODO: better test
  return !/^[a-z]/.test(name);
}

function parse(module) {
  var index = {};
  for (var k in module) {
    if (module.hasOwnProperty(k)) {
      parseType(module[k], index);
    }
  }
  var types = Object.keys(index).map(function (k) {
    return index[k];
  });
  return domain.Doc({types: types});
}

function parseType(T, index) {
  if (!isType(T)) { return; }
  var name = getName(T);
  var kind = T.meta.kind;
  // exclude anonymous types, primitives, any and all types already indexed
  if (kind === 'primitive' || kind === 'any' || index.hasOwnProperty(name)) { return; }
  switch(kind) {
    case 'enums' :
      index[name] = domain.Enums({
        name: name,
        enums: T.meta.map
      });
      break;
    case 'list' :
      if (isNamed(name)) {
        index[name] = domain.List({
          name: name,
          type: getName(T.meta.type)
        });
      }
      parseType(T.meta.type, index);
      break;
    case 'maybe' :
      if (isNamed(name)) {
        index[name] = domain.Maybe({
          name: name,
          type: getName(T.meta.type)
        });
      }
      parseType(T.meta.type, index);
      break;
    case 'struct' :
      var props = Object.keys(T.meta.props); 
      index[name] = domain.Struct({
        name: name,
        props: props.map(function (prop) {
          var P = T.meta.props[prop];
          return domain.Prop({name: prop, type: getName(P)});
        })
      });
      props.forEach(function (prop) {
        var P = T.meta.props[prop];
        parseType(P, index);
      });
      break;
    case 'subtype' :
      if (isNamed(name)) {
        index[name] = domain.Subtype({
          name: name,
          type: getName(T.meta.type),
          predicate: T.meta.predicate.__doc__ || T.meta.predicate.name || 'function'
        });
      }
      parseType(T.meta.type, index);
      break;
    case 'tuple' :
      if (isNamed(name)) {
        index[name] = domain.Tuple({
          name: name,
          types: T.meta.types.map(getName)
        });
      }
      T.meta.types.forEach(function (T) {
        parseType(T, index);
      });
      break;
    case 'union' :
      if (isNamed(name)) {
        index[name] = domain.Union({
          name: name,
          types: T.meta.types.map(getName)
        });
      }
      T.meta.types.forEach(function (T) {
        parseType(T, index);
      });
      break;
    default :
      throw new Error(format('unknown kind %s', getName(T)));
  }
}

module.exports = parse;

},{"./domain":2,"tcomb":"tcomb"}]},{},[1])(1)
});