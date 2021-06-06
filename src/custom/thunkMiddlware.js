export const thunk = (storeAPI) => (next) => (action) => {
  console.log({ action });
  if (typeof action === 'function') {
    return action(storeAPI.dispatch, storeAPI.getState);
  }
  return next(action);
};
