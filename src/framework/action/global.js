/**
 * Created by vison on 17/8/20.
 */
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import * as Actions from '../../constant/dictActions';

export const setInitState = createAction(Actions.SET_INIT_STATE);

export const initApp = () => (dispatch, getState) => {
    const store = getState();
    dispatch(setInitState(true));
};