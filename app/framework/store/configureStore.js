
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';

import { enableBatching } from 'redux-batched-actions';
import rootReducer from '../reducer';

const middleware = [thunkMiddleware, promiseMiddleware, cacheMiddleware];

export default function configureStore(initialState) {
  let finalCreateStore;
  if (process.env.NODE_ENV === 'production') {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  } else {
    const loggerMiddleware = createLogger({ duration: true });
    finalCreateStore = compose(
      applyMiddleware(...middleware, loggerMiddleware),
      devTools({ realtime: true })
    )(createStore);
  }
  const store = finalCreateStore(enableBatching(rootReducer), initialState);
  return store;
}
