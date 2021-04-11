export const decrementReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "DECREMENT":
            return Object.assign({}, state, { value: state.value - 1 });
        default:
            return state;
    }
};