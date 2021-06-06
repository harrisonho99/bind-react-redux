var makeStore$$module$makeStore = function (e, k, l) {
    function r(a) {
      b > f.length - 1 || b++;
      m(a);
    }
    function m(a) {
      if (!n || b > f.length - 1)
        (b = 0),
          (g = e(d, a)),
          g !== d &&
            ((d = g),
            0 < c.length &&
              c.forEach(function (h) {
                h();
              }));
      else p[b](a);
    }
    if ('function' !== typeof e)
      throw Error('Reducer is required as a function and return state');
    var g,
      c = [],
      n = !1,
      b = 0,
      p = [],
      q = {
        getState: function () {
          return d;
        },
        subscribe: function (a) {
          if ('function' !== typeof a) throw Error('Listener must be function');
          c.push(a);
          return function () {
            c = c.filter(function (h) {
              return a !== h;
            });
          };
        },
        dispatch: m,
      };
    if ('function' === typeof l) {
      n = !0;
      var f = l();
      f.forEach(function (a) {
        p.push(a(q)(r));
      });
    }
    var d = 'object' === typeof k ? k : e(void 0, {});
    return q;
  },
  module$makeStore = { makeStore: makeStore$$module$makeStore };
export { makeStore$$module$makeStore as makeStore };
