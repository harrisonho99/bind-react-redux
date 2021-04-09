export const createStore = (reducer) => {
    // check type reducer
    if (typeof reducer !== "function") {
        throw Error("Reducer is required as a function and return state");
    }
    //  init intenal state and listeners from subcribe
    let state;
    let newState;
    let listenerArray = [];
    // init internal  state with dummy action
    state = reducer(undefined, {});

    // setState return copy of state for  prevent mutate the internal state
    const getState = () => {
        return JSON.parse(JSON.stringify(state));
    };
    //subscribe take argguments of functions
    function subscribe() {
        const listOfListener = Array.from(arguments);
        listOfListener.forEach((listener) => {
            if (typeof listener !== "function") {
                throw Error("Listener must be function");
            }
            listenerArray.push(listener);
        });
    }

    //dispatch take action as argument
    const dispatch = (action) => {
        newState = reducer(state, action);
        // compare the ref of newState and internalState
        if (newState !== state) {
            state = newState;
            if (listenerArray.length > 0) {
                // invoke all listener
                listenerArray.forEach((listener) => {
                    listener();
                });
            }
        }
    };

    return {
        getState,
        subscribe,
        dispatch
    };
};
