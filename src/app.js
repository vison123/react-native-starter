/**
 * Created by vison on 17/8/20.
 */

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './framework/store/configureStore';
import {initApp} from './framework/action/global';
import {Router, Scene} from 'react-native-router-flux';

import Login from './biz/login/login';

const store = configureStore();
const setup = () => {
    return () => (
        <Provider store={store}>
            <Router sceneStyle={{ backgroundColor: 'white' }}>
                <Scene key='root' hideNavBar>
                    <Scene key='Login'
                           component={Login}
                           type='replace'/>
                </Scene>
            </Router>
        </Provider>
    );
};

export default setup();