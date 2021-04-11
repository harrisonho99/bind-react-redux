export const asyncIncrement = () => (dispatch) => {
    setTimeout(dispatch, 1000, { type: 'INCREMENT' });
}