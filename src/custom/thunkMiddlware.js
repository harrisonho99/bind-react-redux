export const thunk = (storeAPI) => (next) => (action) => {
  if (typeof action === 'function') {
    action(storeAPI.dispatch, storeAPI.getState);
  }
  next(action);
};
