/**
 * Created by vison on 17/8/20.
 */
const initialState = {
    isFetching: false,
    token: ''
};

export default function global(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_START:
            return {
                ...state,
                isFetching: true,
            };

        case types.FETCH_END:
            return {
                ...state,
                isFetching: false,
            };
    }
}