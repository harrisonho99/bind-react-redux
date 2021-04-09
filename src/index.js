import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Provider from "./Provider";
import App from "./App";
import { createStore } from "./redux";

// reducer
const reducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return Object.assign({}, state, { value: state.value + 1 });
        case "DECREMENT":
            return Object.assign({}, state, { value: state.value - 1 });
        default:
            return state;
    }
};

const store = createStore(reducer);

const rootElement = document.getElementById("root");

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    rootElement
);
