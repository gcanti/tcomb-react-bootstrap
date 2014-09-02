!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.TcombDoc=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  domain: require('./src/domain'),
  parse: require('./src/parser'),
  toMarkdown: require('./src/toMarkdown')
};

},{"./src/domain":3,"./src/parser":4,"./src/toMarkdown":5}],2:[function(require,module,exports){
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.t = factory();
  }
}(this, function () {

  'use strict';

  var failed = false;
  
  function onFail(message) {
    // start debugger only once
    if (!failed) {
      /*jshint debug: true*/
      debugger; 
    }
    failed = true;
    throw new Error(message);
  }
  
  var options = {
    onFail: onFail,
    update: null
  };

  function fail(message) {
    options.onFail(message);
  }
  
  function assert(guard) {
    if (guard !== true) {
      var args = slice.call(arguments, 1);
      var message = args[0] ? format.apply(null, args) : 'assert failed';
      fail(message); 
    }
  }

  //
  // utils
  //
  
  var slice = Array.prototype.slice;
  
  var errs = {
    ERR_BAD_TYPE_VALUE: 'Invalid type argument `value` of value `%j` supplied to `%s`, expected %s.',
    ERR_BAD_COMBINATOR_ARGUMENT: 'Invalid combinator argument `%s` of value `%j` supplied to `%s`, expected %s.',
    ERR_OPTIONS_UPDATE_MISSING: 'Missing `options.update` implementation',
    ERR_NEW_OPERATOR_FORBIDDEN: 'Operator `new` is forbidden for `%s`'
  };
  
  function mixin(target, source, overwrite) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        if (!overwrite) {
          assert(!target.hasOwnProperty(k), 'cannot overwrite property %s', k);
        }
        target[k] = source[k];
      }
    }
    return target;
  }
  
  function format() {
    var args = slice.call(arguments);
    var len = args.length;
    var i = 1;
    var message = args[0];
  
    function formatArgument(match, type) {
      if (match === '%%') { return '%'; }       // handle escaping %
      if (i >= len) { return match; }           // handle less arguments than placeholders
      var formatter = format.formatters[type];
      if (!formatter) { return match; }         // handle undefined formatters
      return formatter(args[i++]);
    }
  
    var str = message.replace(/%([a-z%])/g, formatArgument);
    if (i < len) {
      str += ' ' + args.slice(i).join(' ');     // handle more arguments than placeholders
    }
    return str;
  }
  
  function replacer(key, value) {
    if (typeof value === 'function') {
      return format('Func', value.name);
    }
    return value;
  }
  
  format.formatters = {
    s: function (x) { return String(x); },
    j: function (x) { return JSON.stringify(x, replacer); }
  };
  
  function isType(type) {
    return Func.is(type) && Obj.is(type.meta);
  }
  
  function areTypes(types) {
    return Arr.is(types) && types.every(isType);
  }
  
  function getName(type) {
    assert(isType(type), 'Invalid argument `type` of value `%j` supplied to `getName()`, expected a type.', type);
    return type.meta.name;
  }

  function getKind(type) {
    assert(isType(type), 'Invalid argument `type` of value `%j` supplied to `geKind()`, expected a type.', type);
    return type.meta.kind;
  }

  function isKind(type, kind) {
    return getKind(type) === kind;
  }
  
  function values(obj) {
    var ret = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        ret.push(obj[k]);
      }
    }
    return ret;
  }

  function ensureName(name, defaultName, types) {
    if (Nil.is(name)) {
      if (areTypes(types)) {
        return format(types.length > 1 ? '%s([%s])' : '%s(%s)', defaultName, types.map(getName).join(', '));
      }
      return defaultName;
    }
    assert(Str.is(name), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'name', name, defaultName, 'a `maybe(Str)`');
    return name;
  }
  
  // since in tcomb the only real constructors are those provided
  // by `struct`, the `new` operator is forbidden for all types
  function forbidNewOperator(x, T) {
    assert(!(x instanceof T), errs.ERR_NEW_OPERATOR_FORBIDDEN, getName(T));
  }
  
  function update() {
    assert(Func.is(options.update), errs.ERR_OPTIONS_UPDATE_MISSING);
    /*jshint validthis:true*/
    var T = this;
    var value = options.update.apply(T, arguments);
    return T(value);
  }

  //
  // irriducibles
  //
  
  function irriducible(name, is) {
  
    function Irriducible(value) {
      forbidNewOperator(this, Irriducible);
      assert(is(value), errs.ERR_BAD_TYPE_VALUE, value, name, format('a `%s`', name));
      // all primitives types are idempotent
      return value;
    }
  
    Irriducible.meta = {
      kind: 'irriducible',
      name: name
    };
  
    Irriducible.is = is;
  
    return Irriducible;
  }

  var Any = irriducible('Any', function () {
    return true;
  });
  
  var Nil = irriducible('Nil', function (x) {
    return x === null || x === undefined;
  });
  
  var Str = irriducible('Str', function (x) {
    return typeof x === 'string';
  });
  
  var Num = irriducible('Num', function (x) {
    return typeof x === 'number' && isFinite(x) && !isNaN(x);
  });
  
  var Bool = irriducible('Bool', function (x) {
    return x === true || x === false;
  });
  
  var Arr = irriducible('Arr', function (x) {
    return x instanceof Array;
  });
  
  var Obj = irriducible('Obj', function (x) {
    return !Nil.is(x) && typeof x === 'object' && !Arr.is(x);
  });
  
  var Func = irriducible('Func', function (x) {
    return typeof x === 'function';
  });
  
  var Err = irriducible('Err', function (x) {
    return x instanceof Error;
  });
  
  var Re = irriducible('Re', function (x) {
    return x instanceof RegExp;
  });
  
  var Dat = irriducible('Dat', function (x) {
    return x instanceof Date;
  });
  
  function struct(props, name) {
  
    // check combinator args
    name = ensureName(name, 'struct');
    assert(Obj.is(props), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'props', props, name, 'an `Obj`');
    assert(values(props).every(isType), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'props', props, name, 'a dict of types');
  
    function Struct(value, mut) {
  
      // makes Struct idempotent
      if (Struct.is(value)) {
        return value;
      }
  
      assert(Obj.is(value), errs.ERR_BAD_TYPE_VALUE, value, name, 'an `Obj`');
  
      // makes `new` optional
      if (!(this instanceof Struct)) { 
        return new Struct(value, mut); 
      }
      
      for (var k in props) {
        if (props.hasOwnProperty(k)) {
          this[k] = props[k](value[k], mut);
        }
      }
  
      if (!mut) { 
        Object.freeze(this); 
      }
    }
  
    Struct.meta = {
      kind: 'struct',
      props: props,
      name: name
    };
  
    Struct.is = function (x) { 
      return x instanceof Struct; 
    };
  
    Struct.update = update;
  
    return Struct;
  }

  function union(types, name) {
  
    // check combinator args
    var combinator = 'union';
    name = ensureName(name, combinator, types);
    assert(areTypes(types) && types.length >= 2, errs.ERR_BAD_COMBINATOR_ARGUMENT, 'types', types, combinator, 'a list(type) of length >= 2');
  
    function Union(value, mut) {
      forbidNewOperator(this, Union);
      assert(Func.is(Union.dispatch), 'unimplemented %s.dispatch()', name);
      var T = Union.dispatch(value);
      assert(isType(T), '%s.dispatch() returns no type', name);
      // a union type is idempotent iif every T in types is idempotent
      return T(value, mut);
    }
  
    Union.meta = {
      kind: 'union',
      types: types,
      name: name
    };
  
    Union.is = function (x) {
      return types.some(function (T) {
        return T.is(x);
      });
    };
  
    // default dispatch implementation
    Union.dispatch = function (x) {
      for (var i = 0, len = types.length ; i < len ; i++ ) {
        if (types[i].is(x)) {
          return types[i];
        }
      }
    };

    return Union;
  }

  function maybe(type, name) {
  
    // check combinator args
    var combinator = 'maybe';
    name = ensureName(name, combinator, [type]);
    assert(isType(type), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'type', type, combinator, 'a type');
  
    // makes the combinator idempotent
    if (type.meta.kind === 'maybe') {
      return type;
    }
  
    function Maybe(value, mut) {
      forbidNewOperator(this, Maybe);
      // a maybe type is idempotent iif type is idempotent
      return Nil.is(value) ? null : type(value, mut);
    }
  
    Maybe.meta = {
      kind: 'maybe',
      type: type,
      name: name
    };
  
    Maybe.is = function (x) {
      return Nil.is(x) || type.is(x);
    };
  
    return Maybe;
  }

  function enums(map, name) {
  
    // check combinator args
    name = ensureName(name, 'enums');
    assert(Obj.is(map), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'map', map, name, 'an `Obj`');
  
    // cache expected value
    var expected = 'a valid enum';
  
    function Enums(value) {
      forbidNewOperator(this, Enums);
      assert(Enums.is(value), errs.ERR_BAD_TYPE_VALUE, value, name, expected);
      // all enums types are idempotent
      return value;
    }
  
    Enums.meta = {
      kind: 'enums',
      map: map,
      name: name
    };
  
    Enums.is = function (x) {
      return Str.is(x) && map.hasOwnProperty(x);
    };
  
    return Enums;
  }
  
  enums.of = function (keys, name) {
    keys = Str.is(keys) ? keys.split(' ') : keys;
    var value = {};
    keys.forEach(function (k) {
      value[k] = k;
    });
    return enums(value, name);
  };

  function tuple(types, name) {
  
    // check combinator args
    var combinator = 'tuple';
    name = ensureName(name, combinator, types);
    assert(areTypes(types) && types.length >= 2, errs.ERR_BAD_COMBINATOR_ARGUMENT, 'types', types, combinator, 'a list(type) of length >= 2');
  
    // cache types length
    var len = types.length;
    // cache expected value
    var expected = format('a tuple `(%s)`', types.map(getName).join(', '));
  
    function Tuple(value, mut) {
  
      forbidNewOperator(this, Tuple);
      assert(Arr.is(value) && value.length === len, errs.ERR_BAD_TYPE_VALUE, value, name, expected);
  
      // makes Tuple idempotent
      if (Tuple.isTuple(value)) {
        return value;
      }
  
      var arr = [];
      for (var i = 0 ; i < len ; i++) {
        var T = types[i];
        var v = value[i];
        arr.push(T.is(v) ? v : T(v, mut));
      }
  
      if (!mut) { 
        Object.freeze(arr); 
      }
      return arr;
    }
  
    Tuple.meta = {
      kind: 'tuple',
      types: types,
      name: name
    };
  
    Tuple.isTuple = function (x) {
      return types.every(function (type, i) { 
        return type.is(x[i]); 
      });
    };
  
    Tuple.is = function (x) {
      return Arr.is(x) && x.length === len && Tuple.isTuple(x);
    };
  
    Tuple.update = update;
  
    return Tuple;
  }

  function subtype(type, predicate, name) {
  
    // check combinator args
    var combinator = 'subtype';
    name = ensureName(name, combinator, [type]);
    assert(isType(type), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'type', type, combinator, 'a type');
    assert(Func.is(predicate), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'predicate', predicate, combinator, 'a `Func`');
  
    // cache expected value
    var expected = predicate.__doc__ || 'a valid value for the predicate';
  
    function Subtype(value, mut) {
      forbidNewOperator(this, Subtype);
      // a subtype type is idempotent iif T is idempotent
      var x = type(value, mut);
      assert(predicate(x), errs.ERR_BAD_TYPE_VALUE, value, name, expected);
      return x;
    }
  
    Subtype.meta = {
      kind: 'subtype',
      type: type,
      predicate: predicate,
      name: name
    };
  
    Subtype.is = function (x) {
      return type.is(x) && predicate(x);
    };
  
    /* fix #22
    if (type.meta.kind === 'struct') {
      // keep a reference to prototype to easily define new methods and attach them to supertype
      Subtype.prototype = type.prototype;
    }
    */
  
    return Subtype;
  }

  function list(type, name) {
  
    // check combinator args
    var combinator = 'list';
    name = ensureName(name, combinator, [type]);
    assert(isType(type), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'type', type, combinator, 'a type');
  
    // cache expected value
    var expected = format('a list of `%s`', getName(type));
  
    function List(value, mut) {
  
      forbidNewOperator(this, List);
      assert(Arr.is(value), errs.ERR_BAD_TYPE_VALUE, value, name, expected);
  
      // makes List idempotent
      if (List.isList(value)) {
        return value;
      }
  
      var arr = [];
      for (var i = 0, len = value.length ; i < len ; i++ ) {
        var v = value[i];
        arr.push(type(v, mut));
      }
  
      if (!mut) { 
        Object.freeze(arr); 
      }
      return arr;
    }
  
    List.meta = {
      kind: 'list',
      type: type,
      name: name
    };
  
    List.isList = function (x) {
      return x.every(type.is);
    };
  
    List.is = function (x) {
      return Arr.is(x) && List.isList(x);
    };
  
  
    List.update = update;
  
    return List;
  }

  function dict(type, name) {
  
    // check combinator args
    var combinator = 'dict';
    name = ensureName(name, combinator, [type]);
    assert(isType(type), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'type', type, combinator, 'a type');

    // cache expected value
    var expected = format('a dict of `%s`', getName(type));
  
    function Dict(value, mut) {
  
      forbidNewOperator(this, Dict);
      assert(Obj.is(value), errs.ERR_BAD_TYPE_VALUE, value, name, expected);
  
      // makes Dict idempotent
      if (Dict.isDict(value)) {
        return value;
      }
  
      var obj = {};
      for (var k in value) {
        if (value.hasOwnProperty(k)) {
          obj[k] = type(value[k], mut);
        }
      }
  
      if (!mut) { 
        Object.freeze(obj); 
      }
      return obj;
    }
  
    Dict.meta = {
      kind: 'dict',
      type: type,
      name: name
    };
  
    Dict.isDict = function (x) {
      for (var k in x) {
        if (x.hasOwnProperty(k) && !type.is(x[k])) {
          return false;
        }
      }
      return true;
    };
  
    Dict.is = function (x) {
      return Obj.is(x) && Dict.isDict(x);
    };
  
  
    Dict.update = update;
  
    return Dict;
  }

  function func(Arguments, f, Return, name) {
  
    name = name || 'func()';
    Arguments = Arr.is(Arguments) ? tuple(Arguments, 'Arguments') : Arguments;
    assert(isType(Arguments), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'Arguments', Arguments, name, 'a type or a list of types');
    assert(Func.is(f), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'f', f, name, 'a `Func`');
    assert(Nil.is(Return) || isType(Return), errs.ERR_BAD_COMBINATOR_ARGUMENT, 'Return', Return, name, 'a type');
  
    // makes the combinator idempotent
    Return = Return || null;
    if (isType(f) && f.meta.Arguments === Arguments && f.meta.Return === Return) {
      return f;
    }
  
    function fn() {
  
      var args = slice.call(arguments);
  
      // handle optional arguments
      if (args.length < f.length) {
        args.length = f.length; 
      }
  
      args = Arguments.is(args) ? args : Arguments(args);
  
      var r = f.apply(null, args);
  
      if (Return) {
        r = Return.is(r) ? r : Return(r);
      }
  
      return r;
    }
  
    fn.is = function (x) { 
      return x === fn; 
    };
  
    fn.meta = {
      kind: 'func',
      Arguments: Arguments,
      f: f,
      Return: Return,
      name: name
    };
  
    return fn;
  }

  return {

    util: {
      mixin: mixin,
      format: format,
      isType: isType,
      getName: getName,
      getKind: getKind,
      isKind: isKind,
      values: values,
      slice: slice
    },

    options: options,
    assert: assert,
    fail: fail,
    
    Any: Any,
    Nil: Nil,
    Str: Str,
    Num: Num,
    Bool: Bool,
    Arr: Arr,
    Obj: Obj,
    Func: Func,
    Err: Err,
    Re: Re,
    Dat: Dat,

    irriducible: irriducible,
    struct: struct,
    enums: enums,
    union: union,
    maybe: maybe,
    tuple: tuple,
    subtype: subtype,
    list: list,
    dict: dict,
    func: func
  };
}));

},{}],3:[function(require,module,exports){
'use strict';

var t = require('tcomb');

var Str = t.Str;
var Obj = t.Obj;
var enums = t.enums;
var struct = t.struct;
var union = t.union;
var list = t.list;
var maybe = t.maybe;
var mixin = t.util.mixin;

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

var Dict = struct({
  name: Str,
  type: Str
}, 'Dict');

Dict.prototype.toJSON = toJSON('dict');

var Irriducible = struct({
  name: Str
}, 'Irriducible');

Irriducible.prototype.toJSON = toJSON('irriducible');

var Type = union([Struct, Enums, List, Maybe, Subtype, Tuple, Union, Dict, Irriducible], 'Type');

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
  Prop: Prop,
  Dict: Dict,
  Irriducible: Irriducible
};

},{"tcomb":2}],4:[function(require,module,exports){
'use strict';

var t = require('tcomb');
var domain = require('./domain');

var Obj = t.Obj;
var format = t.util.format;
var isType = t.util.isType;
var getName = t.util.getName;

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
  var kind = t.util.getKind(T);
  // exclude types already indexed
  if (index.hasOwnProperty(name)) { return; }
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
    case 'dict' :
      if (isNamed(name)) {
        index[name] = domain.Dict({
          name: name,
          type: getName(T.meta.type)
        });
      }
      parseType(T.meta.type, index);
      break;
    case 'irriducible' :
      if (isNamed(name)) {
        index[name] = domain.Irriducible({
          name: name
        });
      }
      break;
    default :
      throw new Error(format('unknown kind %s for %j', getName(T), T));
  }
}

module.exports = parse;

},{"./domain":3,"tcomb":2}],5:[function(require,module,exports){
'use strict';

var t = require('tcomb');

var format = t.util.format;

function h4(s) {
  return format('#### %s\n\n', s);
}

function strong(s) {
  return format('**%s**', s);
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

function toMarkdown(json) {
  var md = '';
  json.forEach(function (type) {
    var kind = type.kind;
    var name = type.name;
    md += h4(name);
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
        md += p('`%s` is a `subtype` of `%s`', name, type.type);
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
      case 'dict' :
        md += p('`%s` is a `dict` of `%s`', name, type.type);
        break;
      case 'irriducible' :
        md += p('`%s` is a `irriducible`', name, type.type);
        break;
      default :
        throw new Error(format('unknown kind %s', kind));
    }
  });
  return md;
}

module.exports = toMarkdown;
},{"tcomb":2}]},{},[1])(1)
});