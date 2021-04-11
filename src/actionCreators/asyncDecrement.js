export const asyncDecrement = () => (dispatch) => {
    setTimeout(dispatch, 1000, { type: 'DECREMENT' });
}