import {createStore,applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import rootReduxer from './root-reducer';

const middlewares=[logger];
const store=createStore(rootReduxer,applyMiddleware(...middlewares));
const persistor=persistStore(store);
export {store,persistor};