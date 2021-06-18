const applyMiddleware = (...agrs) => {
  const middlewares = agrs;
  // check valid for each element of an array
  middlewares.forEach((middleware) => {
    if (typeof middleware !== 'function')
      throw Error('Each middleware shoud be a function');
  });
  // the store know valid applyMiddleware function depend on this name of funtion returned
  return () => {
    return middlewares; /** @type Funtion[] middlewares */
  };
};
export { applyMiddleware };
