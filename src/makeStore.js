export const makeStore = (reducer, defaultState, middleware) => {
  // check type reducer
  if (typeof reducer !== 'function') {
    throw Error('Reducer is required as a function and return state');
  }
  //  init intenal state and listeners from subcribe
  let state;
  let newState;
  let listenerArray = [];
  let isApplymiddleware = false;
  let listMiddleware;
  let index = 0;
  let queueMiddleware = [];
  let isDispatching = false;
  var store = {
    getState,
    subscribe,
    dispatch,
  };
  // check valid applyMiddleware
  if (typeof middleware === 'function') {
    isApplymiddleware = true;
    listMiddleware = middleware();
    listMiddleware.forEach((singleMidleware) => {
      queueMiddleware.push(singleMidleware(store)(next));
    });
  } else if (middleware && typeof middleware !== 'function') {
    throw new Error('Invalid middleware');
  }

  //init internal state with dummy action
  // state = reducer(undefined, {});
  //  reducer(undefined, {});

  // setState return copy of state for  prevent mutate the internal state
  // i relized that clone state cause performance problems
  function getState() {
    // return JSON.parse(JSON.stringify(state));
    return state;
  }
  //subscribe take arggument of functions
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw Error('Listener must be function');
    }
    listenerArray.push(listener);
    return function unSubscribe() {
      listenerArray = listenerArray.filter((element) => listener !== element);
    };
  }

  //next middleware
  function next(action) {
    if (!(index > listMiddleware.length - 1)) {
      index++;
    }
    dispatch(action);
  }
  //dispatch take action as argument
  function dispatch(action) {
    /*if middleware has applied,
        store will not dispatch immediately,
        instead it have piped storeAPI, action to those middlewares */

    isDispatching = true;
    if (isApplymiddleware && !(index > listMiddleware.length - 1)) {
      queueMiddleware[index](action);
    } else {
      index = 0;
      newState = reducer(state, action);
      /* compare the reference of newState and oldState,
            if not strictly equal invoke all subscribers */
      if (newState !== state) {
        state = newState;
        if (listenerArray.length) {
          listenerArray.forEach((listener) => {
            listener();
          });
        }
      }
    }
  }
  store.dispatch({});
  //check if has default state
  if (typeof defaultState === 'object') {
    state = { ...state, ...defaultState };
  }

  return store;
};
