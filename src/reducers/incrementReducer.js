
import { deep } from "../copy"

export const incrementReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            let newState = deep(state)
            newState.value = state.value + 1
            return newState
        default:
            return state;
    }
};

