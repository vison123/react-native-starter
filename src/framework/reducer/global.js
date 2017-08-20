/**
 * Created by vison on 17/8/20.
 */

import * as Actions from '../../constant/dictActions';

const initialState = {
    isFetching: false,
    token: '',
    initState: 'false'
};

export default function global(state = initialState, action) {
    switch (action.type) {

        case Actions.FETCH_START:
            return {
                ...state,
                isFetching: true,
            };

        case Actions.FETCH_END:
            return {
                ...state,
                isFetching: false,
            };

        case Actions.SET_INIT_STATE:
            return {
                ...state,
                initState: action.payload,
            };
        default:
            return state;
    }
}