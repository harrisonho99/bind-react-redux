import { shallow, } from "../copy"

export const decrementReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "DECREMENT":
            let newState = shallow(state)
            newState.value = state.value - 1
            return newState
        default:
            return state;
    }
};

