/**
 * Created by vison on 17/8/20.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import devTools from 'remote-redux-devtools';

import { enableBatching } from 'redux-batched-actions';
import rootReducer from '../reducer';

const middleware = [thunkMiddleware, promiseMiddleware];

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
