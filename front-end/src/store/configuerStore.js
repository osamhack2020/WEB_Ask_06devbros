import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import logger from 'redux-logger';

import appReducer from '../reducers/index';
import history from '../utils/history';

export {history};

const middlewares = [thunkMiddleware, logger, routerMiddleware(history)];

const store = createStore(appReducer(history), {}, compose(
    applyMiddleware(...middlewares)
    )
);

export default store;