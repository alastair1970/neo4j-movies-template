import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from "history";

import sagas from './objects/Index';
import createRootReducer from './objects/Index/indexReducers';
import Routes from './pages/Routes.jsx';

const reduxLoggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
	createRootReducer(history),
	applyMiddleware(
		routerMiddleware(history),
		thunkMiddleware,
		sagaMiddleware,
		reduxLoggerMiddleware,
	),
)

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
