var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = [
    'object' == typeof globalThis && globalThis,
    a,
    'object' == typeof window && window,
    'object' == typeof self && self,
    'object' == typeof global && global,
  ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }
  throw Error('Cannot find global object');
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  'function' === typeof Symbol && 'symbol' === typeof Symbol('x');
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = '$jscp$';
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function (a, b, c, d) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, d)
      : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
  c = $jscomp.global;
  a = a.split('.');
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in c)) return;
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d &&
    null != b &&
    $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
  var e = a.split('.');
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in d)) return;
    d = d[g];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && 'es6' === c ? d[e] : null;
  b = b(c);
  null != b &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, e, {
          configurable: !0,
          writable: !0,
          value: b,
        })
      : b !== c &&
        (void 0 === $jscomp.propertyToPolyfillSymbol[e] &&
          ((c = (1e9 * Math.random()) >>> 0),
          ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE
            ? $jscomp.global.Symbol(e)
            : $jscomp.POLYFILL_PREFIX + c + '$' + e)),
        $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
          configurable: !0,
          writable: !0,
          value: b,
        })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
  'Symbol',
  function (a) {
    if (a) return a;
    var b = function (f, g) {
      this.$jscomp$symbol$id_ = f;
      $jscomp.defineProperty(this, 'description', {
        configurable: !0,
        writable: !0,
        value: g,
      });
    };
    b.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      d = 0,
      e = function (f) {
        if (this instanceof e)
          throw new TypeError('Symbol is not a constructor');
        return new b(c + (f || '') + '_' + d++, f);
      };
    return e;
  },
  'es6',
  'es3'
);
$jscomp.polyfill(
  'Symbol.iterator',
  function (a) {
    if (a) return a;
    a = Symbol('Symbol.iterator');
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = $jscomp.global[b[c]];
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        $jscomp.defineProperty(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
          },
        });
    }
    return a;
  },
  'es6',
  'es3'
);
$jscomp.iteratorPrototype = function (a) {
  a = { next: a };
  a[Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function (a, b) {
  a instanceof String && (a += '');
  var c = 0,
    d = !1,
    e = {
      next: function () {
        if (!d && c < a.length) {
          var f = c++;
          return { value: b(f, a[f]), done: !1 };
        }
        d = !0;
        return { done: !0, value: void 0 };
      },
    };
  e[Symbol.iterator] = function () {
    return e;
  };
  return e;
};
$jscomp.polyfill(
  'Array.prototype.keys',
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (b) {
            return b;
          });
        };
  },
  'es6',
  'es3'
);
function combineReducers$$module$combineReducers(a) {
  if ('object' !== typeof a)
    throw Error('all reducers must wrapped in a object!');
  var b = Object.keys(a);
  return function (c, d) {
    for (var e, f = 0; f < b.length; f++) {
      e = a[b[f]](c, d);
      if (e !== c) return e;
      if (f === b.length - 1) return c;
    }
  };
}
var module$combineReducers = {};
module$combineReducers.combineReducers =
  combineReducers$$module$combineReducers;
export { combineReducers$$module$combineReducers as combineReducers };
