export var applyMiddleware$$module$applyMiddleware = function (d) {
    for (var b = [], a = 0; a < arguments.length; ++a) b[a - 0] = arguments[a];
    b.forEach(function (c) {
      if ('function' !== typeof c)
        throw Error('Each middleware shoud be a function');
    });
    return function () {
      return b;
    };
  },
  module$applyMiddleware = {
    applyMiddleware: applyMiddleware$$module$applyMiddleware,
  };
export { applyMiddleware$$module$applyMiddleware as applyMiddleware };
