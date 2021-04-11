import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Provider from "./Provider";
import App from "./components/App";
import { createStore } from "./redux";
import combineReducers from "./reducers/index"
import { applyMiddleware } from "./applyMiddleware";
import { loggerMiddleware } from "./loggerMiddleware"
const store = createStore(combineReducers, undefined,
    applyMiddleware(loggerMiddleware)
);

window.store = store
const rootElement = document.getElementById("root");

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    rootElement
);
