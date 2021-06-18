import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Provider from './bind_react/Provider';
import App from './components/App';
import { makeStore } from './makeStore';
import combineReducers from './reducers/index';
import { applyMiddleware } from './applyMiddleware';
import { logger } from './custom/loggerMiddleware';
import { thunk } from './custom/thunkMiddlware';

const store = makeStore(
  combineReducers,
  undefined,
  applyMiddleware(logger, thunk)
);

const rootElement = document.getElementById('root');

// Demo with react
ReactDOM.render(
  <StrictMode>
    <Provider value={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
