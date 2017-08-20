/**
 * Created by vison on 17/8/20.
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { initApp } from '../action/global';
import Application from '../system/navigator';
import { initSqlite } from '../persister/sqliteManager';
import DispatchService from '../service/DispatchService';

const store = configureStore();
const setup = () => {
    initSqlite()
        .then(() => store.dispatch(initApp()))
        .then(() => init(store))
        .then(() => {
            IMService.init(store);
            DispatchService.init(store.dispatch, store.subscribe);
        });
    initNum();
    return () => (
        <Provider store={store}>
            <Application />
        </Provider>
    );
};

export default setup();

